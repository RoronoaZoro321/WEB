import persistent

class Course(persistent.Persistent):
    def __init__(self, id, name="", credit=0):
        self.id = id
        self.name = name
        self.credit = credit
    def __str__(self):
        # return f"Course({self.id}, {self.name}, {self.credit})"
        return f"ID: \t{self.id}  Course: \t{self.name:<30}  ,  Credit: {self.credit}"
    
    def setName(self, name):
        self.name = name
    def printDetail(self):
        print(self.__str__())

class Student(persistent.Persistent):
    def __init__(self, id, name=""):
        self.enroll = []
        self.id = id
        self.name = name

    def enrollCourse(self, course):
        x = Enrollment(self, course)
        self.enroll.append(x)
        return x
        
    def getEnrollment(self, course):
        for enroll in self.enroll:
            if enroll.getCourse() == course:
                return enroll
        return None
    
    def getGPA(self):
        totalCredit = 0
        totalGrade = 0
        for enroll in self.enroll:
            course = enroll.getCourse()
            credit = course.credit
            grade = enroll.getGrade()
            if grade == "A":
                totalGrade += 4 * credit
            elif grade == "B":
                totalGrade += 3 * credit
            elif grade == "C":
                totalGrade += 2 * credit
            elif grade == "D":
                totalGrade += 1 * credit
            elif grade == "F":
                totalGrade += 0 * credit
            totalCredit += credit
        return format(totalGrade / totalCredit, ".2f") 

    def printTranscript(self):
        print("\t Transcript")
        print(f"ID: \t {self.id}  Name: {self.name}")
        print("Course list")
        for enroll in self.enroll:
            course = enroll.getCourse()
            grade = enroll.getGrade()
            print(
                f"    ID: {course.id:>10}  Course: {course.name:<30} , Credit {course.credit:>5} Grade: {grade:>5}")
        print("Total GPA is: ", self.getGPA())
        print()

    def setName(self, name):
        self.name = name

class Enrollment(persistent.Persistent):
    def __init__(self, student, course, grade=""):
        self.student = student
        self.course = course
        self.grade = grade
    def __str__(self):
        return f"Enrollment({self.student}, {self.course}, {self.grade})"
    def getCourse(self):
        return self.course
    def getGrade(self):
        return self.grade
    def printDetail(self):
        print(self.__str__())
    def setGrade(self, grade):
        self.grade = grade
    