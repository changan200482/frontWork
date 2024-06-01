from flask import Flask, request, jsonify ,send_from_directory
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

# 配置SQL Server连接字符串
server = 'REDMIBOOK\\SQLEXPRESS'
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

    # 容差范围（例如 0.00001 度）
    tolerance = 0.00001

    # 检查数据库是否已经存在相同经纬度的点
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT COUNT(*) FROM points 
        WHERE ABS(latitude - ?) < ? AND ABS(longitude - ?) < ?
    ''', (latitude, tolerance, longitude, tolerance))
    existing_count = cursor.fetchone()[0]  # 获取结果中的计数值

    if existing_count > 0:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Point already exists in the database'})

    # 将数据保存到数据库
    cursor.execute('INSERT INTO points (latitude, longitude, name, note, message) VALUES (?, ?, ?, ?, ?)', (latitude, longitude, name, note, message))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success'})


@app.route('/remove', methods=['POST'])
def remove_data():
    try:
        data = request.json
        name = data.get('name')


        if name is None:
            return jsonify({'status': 'error', 'message': 'Latitude and longitude are required'}), 400

        # 从数据库删除数据
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM points WHERE name = ?', (name,))
        conn.commit()
        conn.close()

        return jsonify({'status': 'success'})

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/check_name', methods=['POST'])
def check_name():
    try:
        data = request.json
        name = data.get('name')
        
        if not name:
            return jsonify({'status': 'error', 'message': 'Name is required'}), 400
        
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM points WHERE name = ?', (name,))
        count = cursor.fetchone()[0]
        conn.close()
        
        exists = count > 0
        return jsonify({'status': 'success', 'exists': exists})
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/books')
def get_books():
    return send_from_directory('books', 'books.xml')

if __name__ == '__main__':
    app.run(debug=True)

