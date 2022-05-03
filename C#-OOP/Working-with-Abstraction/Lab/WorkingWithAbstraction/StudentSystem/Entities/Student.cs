using System.Text;

namespace StudentSystem.Entities
{
    public class Student
    {
        public double Grade { get; set; }

        public int Age { get; set; }

        public string Name { get; set; }

        public Student(string name, int age, double grade)
        {
            this.Name = name;
            this.Age = age;
            this.Grade = grade;
        }
        public override string ToString()
        {
            var student = new StringBuilder();

            student.Append($"{this.Name} is {this.Age} years old.");

            if (this.Grade >= 5.00)
            {
                student.Append(" Excellent student.");
            }
            else if (this.Grade < 5.00 && this.Grade >= 3.50)
            {
                student.Append(" Average student.");
            }
            else
            {
                student.Append(" Very nice person.");
            }

            return student.ToString();
        }
    }
}