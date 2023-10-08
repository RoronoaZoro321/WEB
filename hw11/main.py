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
    
    gradeScheme_202 = [
            {"Grade": "A", "Min": 90, "Max": 100},
            {"Grade": "B", "Min": 70, "Max": 89},
            {"Grade": "C", "Min": 60, "Max": 69},
            {"Grade": "D", "Min": 50, "Max": 59},
            {"Grade": "F", "Min": 0, "Max": 49}
        ]
    root.courses['202'].setGradeScheme(gradeScheme_202)

    gradeScheme_301 = [
            {"Grade": "A", "Min": 80, "Max": 100},
            {"Grade": "B", "Min": 70, "Max": 79},
            {"Grade": "C", "Min": 50, "Max": 69},
            {"Grade": "D", "Min": 40, "Max": 49},
            {"Grade": "F", "Min": 0, "Max": 39}
        ]
    root.courses['301'].setGradeScheme(gradeScheme_301)




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