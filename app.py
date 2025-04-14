from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

existing_users = [
    'tejas02',
    'rahul123',
    'neha_k',
    'amit09',
    'priya_singh',
    'arjun01',
    'tanvi.m',
    'vikas2024',
    'meena_raj',
    'dev_patil',
    'ananya99',
    'sachin.k',
    'shreya05',
    'manish_87',
    'deepika21',
    'rohit_b'
]

college_names = [
    'Veermata Jijabai Technological Institute (VJTI)',
    'Sardar Patel Institute of Technology (SPIT)',
    'Thadomal Shahani Engineering College (TSEC)',
    'Dwarkadas J. Sanghvi College of Engineering (DJSCE)',
    'K. J. Somaiya College of Engineering',
    'Fr. Conceicao Rodrigues College of Engineering (FRCRCE)',
    'Rajiv Gandhi Institute of Technology (RGIT)',
    'Don Bosco Institute of Technology',
    'Shah & Anchor Kutchhi Engineering College',
    'Vivekanand Education Society\'s Institute of Technology (VESIT)',
    'Atharva College of Engineering',
    'Xavier Institute of Engineering (XIE)',
    'Vidyalankar Institute of Technology (VIT)',
    'Lokmanya Tilak College of Engineering (LTCE)',
    'Watumull Institute of Electronics Engineering and Computer Technology'
]


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    name = request.form['name'].strip()
    college = request.form['college'].strip()
    username = request.form['username'].strip()
    password = request.form['password']
    retype_password = request.form['retype_password']

    if not name:
        return jsonify({'message': 'Name cannot be empty.'})

    if username in existing_users:
        return jsonify({'message': 'Username already exists.'})

    if password != retype_password:
        return jsonify({'message': 'Passwords do not match.'})

    return jsonify({'message': 'Successfully Registered!'})

@app.route('/suggest_college')
def suggest_college():
    query = request.args.get('query', '').lower()
    suggestions = [name for name in college_names if query in name.lower()]
    return jsonify({'suggestions': suggestions})

@app.route('/check_username')
def check_username():
    username = request.args.get('username', '').strip()
    exists = username in existing_users
    return jsonify({'exists': exists})


if __name__ == '__main__':
    app.run(debug=True)
