using System;

namespace StudentSystem
{
    public class Engine
    {
        private readonly StudentData studentData;
        private readonly IInputOutputProvider inputOutputProvider;

        public Engine(StudentData studentData, IInputOutputProvider inputOutputProvider)
        {
            this.studentData = studentData;
            this.inputOutputProvider = inputOutputProvider;
        }

        public void Process()
        {
            while (true)
            {
                var line = this.inputOutputProvider.GetInput();

                var command = Command.Parse(line);
                var end = this.ExecuteCommand(command);

                if (end)
                {
                    break;
                }
            }
        }
        private bool ExecuteCommand(Command command)
        {
            var commandName = command.Name;
            var arguments = command.Arguments;

            switch (commandName)
            {
                case "Create":
                    var studentName = arguments[0];
                    var age = int.Parse(arguments[1]);
                    var grade = double.Parse(arguments[2]);
                    this.studentData.Add(studentName, age, grade);

                    break;
                case "Show":
                    var details = this.studentData.GetDetails(arguments[0]);
                    this.inputOutputProvider.ShowOutput(details);

                    break;
                case "Exit":
                    return true;
            }

            return false;
        }
    }
}
