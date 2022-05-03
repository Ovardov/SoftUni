namespace PointInRectangle
{
    public class Rectangle
    {
        public Point TopLeft { get; set; }

        public Point BottomRight { get; set; }

        public Rectangle(Point topLeftPoint, Point bottomRightPoint)
        { 
            this.TopLeft = topLeftPoint;
            this.BottomRight = bottomRightPoint;
        }

        public bool Contains(Point point)
        {
            var xIsInside = this.TopLeft.X <= point.X && point.X <= this.BottomRight.X;
            var yIsInside = point.Y <= this.BottomRight.Y && this.TopLeft.Y <= point.Y;
            
             return xIsInside && yIsInside;
        }
    };
};
