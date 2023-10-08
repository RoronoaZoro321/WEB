import persistent

class Course(persistent.Persistent):
    def __init__(self, id, name="", credit=0):
        self.id = id
        self.name = name
        self.credit = credit
        self.gradeScheme = [
            {"Grade": "A", "Min": 80, "Max": 100},
            {"Grade": "B", "Min": 70, "Max": 79},
            {"Grade": "C", "Min": 60, "Max": 69},
            {"Grade": "D", "Min": 50, "Max": 59},
            {"Grade": "F", "Min": 0, "Max": 49}
        ]
    def __str__(self):
        return f"ID: \t{self.id}  Course: \t{self.name:<30}  ,  Credit: {self.credit}"
    def setName(self, name):
        self.name = name
    def printDetail(self):
        print(self.__str__())
    def scoreGrading(self, score):
        for grade in self.gradeScheme:
            if score >= grade["Min"] and score <= grade["Max"]:
                return grade["Grade"]
    def setGradeScheme(self, scheme):
        if type(scheme) == list and len(scheme) == 5 and type(scheme[0]) == dict \
        and "Grade" in scheme[0] and "Min" in scheme[0] and "Max" in scheme[0]:
            self.gradeScheme = scheme
        else: print("Invalid correct format for grade scheme")

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
        print("\tTranscript")
        print(f"ID: \t {self.id}  Name: {self.name}")
        print("Course list")
        for enroll in self.enroll:
            course = enroll.getCourse()
            grade = enroll.getGrade()
            score = enroll.getScore()
            print(
                f"    ID: {course.id:>10}  Course: {course.name:<30} , Credit {course.credit:>5} Score: {score:>5} Grade: {grade:>5}")
        print("Total GPA is: ", self.getGPA())
        print()

    def setName(self, name):
        self.name = name

class Enrollment(persistent.Persistent):
    def __init__(self, student, course, score=0):
        self.student = student
        self.course = course
        self.score = score
    def __str__(self):
        return f"Enrollment({self.student}, {self.course}, {self.score})"
    def getCourse(self):
        return self.course
    def printDetail(self):
        print(self.__str__())
    def getScore(self):
        return self.score
    def setScore(self, score):
        self.score = score
    def getGrade(self):
        s = self.score
        g = self.course.scoreGrading(s)
        return g 