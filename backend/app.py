from flask import Flask, request, jsonify ,send_from_directory
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

# 配置SQL Server连接字符串
server = 'REDMIBOOK\SQLEXPRESS'
database = 'mapMessage'
username = 'ASaki'
password = '200482'
driver = '{ODBC Driver 17 for SQL Server}'
connection_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

from flask import Flask, request, jsonify ,send_from_directory
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

# 配置SQL Server连接字符串
server = 'REDMIBOOK\SQLEXPRESS'
database = 'mapMessage'
username = 'ASaki'
password = '200482'
driver = '{ODBC Driver 17 for SQL Server}'
connection_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

@app.route('/data', methods=['GET'])
def get_data():
    # 从数据库获取数据
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM points')
    rows = cursor.fetchall()
    conn.close()

    # 构建返回数据
    response_data = [{'id': row[0], 'latitude': row[1], 'longitude': row[2], 'name': row[3], 'note': row[4], 'message': row[5]} for row in rows]

    return jsonify(response_data)

@app.route('/data', methods=['POST'])
def save_data():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    name = data.get('name')
    note = data.get('note')
    message = data.get('message')

    # 检查数据库是否已经存在相同经纬度的点
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM points WHERE latitude = ? AND longitude = ?', (latitude, longitude))
    existing_count = cursor.fetchone()[0]  # 获取结果中的计数值
    conn.close()

    if existing_count > 0:
        return jsonify({'status': 'error', 'message': 'Point already exists in the database'})

    # 将数据保存到数据库
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO points (latitude, longitude, name, note, message) VALUES (?, ?, ?, ?, ?)', (latitude, longitude, name, note, message))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success'})

@app.route('/books')
def get_books():
    return send_from_directory('books', 'books.xml')

if __name__ == '__main__':
    app.run(debug=True)

