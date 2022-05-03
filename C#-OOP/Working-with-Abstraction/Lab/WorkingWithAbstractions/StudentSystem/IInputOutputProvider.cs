namespace StudentSystem
{
    public interface IInputOutputProvider
    {
        string GetInput();

        void ShowOutput(string data);
    }
}
