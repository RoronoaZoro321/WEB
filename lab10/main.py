import requests


def one():
    url = 'http://161.246.5.61:11258/students/html/'
    response = requests.get(url)

    if response.status_code == 200:
        print('resquest successfully')
        print('Response', response.text)
    else:
        print('Error', response.status_code)


def two():
    id = input('Enter student ID: ')
    url = f'http://161.246.5.61:11258/students/html/{id}'
    response = requests.get(url)

    if response.status_code == 200:
        print('resquest successfully')
        print('Response', response.text)
    else:
        print('Error', response.status_code)

def three():
    name = input('Enter student name: ')
    surname = input('Enter student surname: ')
    id = input('Enter student ID: ')
    url = f'http://161.246.5.61:11258/students/newForm/?student_name={name}&student_surname={surname}&student_id={id}'
    response = requests.post(url)
    
    if response.status_code == 200:
        print('resquest successfully')
        print('Response', response.text)
    else:
        print('Error', response.status_code)

def four():
    name = input('Enter student name: ')
    surname = input('Enter student surname: ')
    id = input('Enter student ID: ')
    url = f'http://161.246.5.61:11258/students/new/{name}/{surname}/{id}'
    response = requests.post(url)
    
    if response.status_code == 200:
        print('resquest successfully')
        print('Response', response.text)
    else:
        print('Error', response.text)

def five():
    url = 'http://161.246.5.61:11258/students/new'
    data = {
        "name": "name3",
        "surname": "surname3",
        "ID": 11202
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print('resquest successfully')
        print('Response', response.text)
    else:
        print('Error', response.status_code)

# one()
# two()
# three()
four()
# five()

