<<<<<<< HEAD
import ZODB, ZODB.FileStorage
import persistent
import transaction
from z_enrollment import Course, Student, Enrollment

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

import BTrees.OOBTree
root.courses = BTrees.OOBTree.BTree()
root.students = BTrees.OOBTree.BTree()
root.enrollments = BTrees.OOBTree.BTree()

def addCourse():
    root.courses['101'] = Course('101', 'Computer Programming', 4)
    root.courses['201'] = Course('201', 'Web Programming', 4)
    root.courses['202'] = Course('202', 'Software Engineering Principle', 5)
    root.courses['301'] = Course('301', 'Artificail Intelligent', 3)



def addStudent_1():
    root.students['1100'] = Student('1100', 'Mr. Name ForExample')
    enroll1 = root.students['1100'].enrollCourse(root.courses['101'])
    enroll1.setScore(75)
    enroll2 = root.students['1100'].enrollCourse(root.courses['201'])
    enroll2.setScore(81)
    enroll3 = root.students['1100'].enrollCourse(root.courses['202'])
    enroll3.setScore(81)
    enroll4 = root.students['1100'].enrollCourse(root.courses['301'])
    enroll4.setScore(57)


# def retrive_course(id):
#     return root.courses[id]


# c = root.courses['101']
# c.setName('Computer Programming2')
# transaction.commit()
# print(retrive_course('101'))



if __name__ == "__main__":
    
    addCourse()
    addStudent_1()

    courses = root.courses
    for c in courses:
        course = courses[c]
        course.printDetail()
    print()

    students = root.students
    for s in students:
        student = students[s]
        student.printTranscript()
    print()
=======
import ZODB, ZODB.FileStorage
import persistent
import transaction
from z_enrollment import Course, Student, Enrollment

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

import BTrees.OOBTree
root.courses = BTrees.OOBTree.BTree()
root.students = BTrees.OOBTree.BTree()
root.enrollments = BTrees.OOBTree.BTree()

def addCourse():
    root.courses['101'] = Course('101', 'Computer Programming', 4)
    root.courses['201'] = Course('201', 'Web Programming', 4)
    root.courses['202'] = Course('202', 'Software Engineering Principle', 5)
    root.courses['301'] = Course('301', 'Artificail Intelligent', 3)

def addStudent_1():
    root.students['1100'] = Student('1100', 'Mr. Name ForExample')
    enroll1 = root.students['1100'].enrollCourse(root.courses['101'])
    enroll1.setGrade("B")
    enroll2 = root.students['1100'].enrollCourse(root.courses['201'])
    enroll2.setGrade("B")
    enroll3 = root.students['1100'].enrollCourse(root.courses['202'])
    enroll3.setGrade("C")
    enroll4 = root.students['1100'].enrollCourse(root.courses['301'])
    enroll4.setGrade("C")

# def addStudent_2():
#     root.students['1102'] = Student('1102', 'Mr. Zhong Li')
#     enroll1 = root.students['1102'].enrollCourse(root.courses['101'])
#     enroll1.setGrade("A")
#     enroll2 = root.students['1102'].enrollCourse(root.courses['201'])
#     enroll2.setGrade("B")
#     enroll3 = root.students['1102'].enrollCourse(root.courses['202'])
#     enroll3.setGrade("D")

# def addStudent_3():
#     root.students['1103'] = Student('1103', 'Mr. Dvalinn Durinson')
#     enroll1 = root.students['1103'].enrollCourse(root.courses['101'])
#     enroll1.setGrade("C")
#     enroll2 = root.students['1103'].enrollCourse(root.courses['201'])
#     enroll2.setGrade("A")
#     enroll3 = root.students['1103'].enrollCourse(root.courses['202'])
#     enroll3.setGrade("B")
#     enroll4 = root.students['1103'].enrollCourse(root.courses['301'])
#     enroll4.setGrade("C")


# def retrive_course(id):
#     return root.courses[id]


# c = root.courses['101']
# c.setName('Computer Programming2')
# transaction.commit()
# print(retrive_course('101'))



if __name__ == "__main__":
    
    addCourse()
    addStudent_1()
    # addStudent_2()
    # addStudent_3()

    courses = root.courses
    for c in courses:
        course = courses[c]
        course.printDetail()
    print()

    students = root.students
    for s in students:
        student = students[s]
        student.printTranscript()
    print()
>>>>>>> 0e0814a1bebfe7495b0b84f4a90b2b80adf7ba76
