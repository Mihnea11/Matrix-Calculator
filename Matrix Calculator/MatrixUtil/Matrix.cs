using System;

namespace MatrixUtil
{
    public class Matrix
    {
        private readonly int n;
        private readonly int m;
        private readonly double[,] matrix;
        
        public Matrix(int n, int m)
        {
            this.n = n;
            this.m = m;
            matrix = new double[n, m];
        }

        public Matrix(int n)
        {
            this.n = n;
            m = n;
            matrix = new double[n, m];
        }

        public double this[int i, int j]
        {
            get 
            {
                if (i >= 0 && i < n && j >= 0 && j < m)
                {
                    return matrix[i, j];
                }

                throw new IndexOutOfRangeException();
            }

            set
            {
                if (i >= 0 && i < n && j >= 0 && j < m)
                {
                    matrix[i, j] = value;
                }
                else 
                { 
                    throw new IndexOutOfRangeException(); 
                }
            }
        }

        public static Matrix operator +(Matrix a, Matrix b)
        {
            if (a.n != b.n || a.m != b.m)
            {
                throw new Exception();
            }

            var result = new Matrix(a.n, a.m);
            for(int i = 0; i < a.n; i++)
            {
                for(int j = 0; j < a.m; j++)
                {
                    result[i, j] = a[i, j] + b[i, j];
                }
            }

            return result; 
        }

        public double Determinant()
        {
            double det = 0;
            for (int i = 0; i < n; i++)
            {
                det += matrix[0, i] * Determinant(0, i, n - 1) * Math.Pow(-1, i);
            }

            return det;
        }

        private double Determinant(int i, int j, int step)
        {
            if(step == 1)
            {
                return matrix[i, j];
            }

            double det = 0;
            for (int i1 = 0; i1 < step; i1++)
            {
                det += matrix[0, i1] * Determinant(0, i1, step - 1) * Math.Pow(-1, i1);
            }

            return det;
        }
    }
}
