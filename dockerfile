FROM ubuntu:22.04

WORKDIR /Campus_Logistics

RUN apt-get update -y && \
    source venv/bin/activate && \
    apt install python3-pip -y && \
    pip3 install SQLAlchemy && \
    sudo apt install python3-dev default-libmysqlclient-dev build-essential -y && \
    apt install mysql-server -y && \
    systemctl start mysql.service && \
    apt-get install python3-dev && \
    apt-get install libmysqlclient-dev && \
    apt-get install zlib1g-dev && \
    sudo apt-get install build-essential pkg-config python3-dev default-libmysqlclient-dev && \
    pip3 install mysqlclient && \
    cat setup_mysql_dev.sql | sudo mysql && \
    cat quitter | ./console.py && \
    pip3 install flask && \
    pip3 install flasgger && \
    pip3 install flask_jwt_extended && \
    pip3 install flask_cors && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash && \
    souce ~/.bashrc && \
    nvm install 24 && \
    apt install npm && \
    npm install vite@7.1.9
