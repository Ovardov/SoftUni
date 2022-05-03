namespace StudentSystem.Entities
{
    public class StartUp
    {
        public static void Main()
        {
            var studentData = new StudentData();
            var inputOutputProvider = new ConsoleInputOutputProvider();
            var engine = new Engine(studentData, inputOutputProvider);
            engine.Process();
        }
    }
}
