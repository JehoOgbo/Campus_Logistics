#!/usr/bin/env python3
import requests
from flask import Flask, redirect, render_template
from dotenv import load_dotenv
import hmac
import hashlib
import json
import os

app = Flask(__name__)


load_dotenv()

PAYSTACK_SECRET_KEY = os.getenv('PAYSTACK_SECRET_KEY')

@app.route('/verify/<reference>', strict_slashes=False)
def verify_payment(reference):
    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {
            "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
            }

    response = requests.get(url, headers=headers)
    res_data = response.json()

    if res_data['status'] and res_data['data']['status'] == 'success':
        amount_paid = res_data['data']['amount'] / 100
        return jsonify({'success': f"{amount_paid}"})
    else:
        return jsonify({'failure': 'payment not verified'}), 400

@app.route('/paystack-webhook', methods=['POST'], strict_slashes=False)
def handle_webhook():
    paystack_signature = request.headers.get('x-paystack-signature')
    payload = request.data

    pay_hash = hmac.new(PAYSTACK_SECRET_KEY.encode('utf-8'), payload, hashlib.sha512).hexdigest()

    if pay_hash == paystack_signature:
        event = json.loads(payload)

        if event['event'] == 'charge.success':
            customer_email = event['data']['customer']['email']
            reference = event['data']['reference']
            # do any necessary database stuff here
            return jsonify({"status": "success"}), 200

        return jsonify({"status": "failed"}), 400
