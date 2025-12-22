#!/usr/bin/env python3
import requests
from flask import Flask, redirect, render_template
from dotenv import load_dotenv

load_dotenv()

PAYSTACK_SECRET_KEY = os.getenv('PAYSTACK_SECRET_KEY')

@app.route('/verify/<reference>')
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
