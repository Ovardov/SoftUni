using StudentSystem.Entities;
using System.Collections.Generic;

namespace StudentSystem
{
    public class StudentData
    {
        public Dictionary<string, Student> Students { get; } = new Dictionary<string, Student>();

        public void Add(string name, int age, double grade)
        {
            if (this.Students.ContainsKey(name))
            {
                return;

            }

            var student = new Student(name, age, grade);
            this.Students[name] = student;
        }

        public string GetDetails(string name)
        {
            if (!this.Students.ContainsKey(name))
            {
                return null;
            }

            var student = this.Students[name];
            return student.ToString();
        }
    }
}
