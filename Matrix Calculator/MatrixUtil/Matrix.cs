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

        public static Matrix operator -(Matrix a, Matrix b)
        {
            if(a.n != b.n || a.m != b.m)
            {
                throw new Exception();
            }

            var result = new Matrix(a.n, a.m);
            for (int i = 0; i < a.n; i++)
            {
                for (int j = 0; j < a.m; j++)
                {
                    result[i, j] = a[i, j] - b[i, j];
                }
            }

            return result;
        }

        public static Matrix operator *(Matrix a, Matrix b)
        {
            if (a.m != b.n)
            {
                throw new Exception();
            }

            var result = new Matrix(a.n, a.m);
            for (int i = 0; i < a.n; i++)
            {
                for (int j = 0; j < b.m; j++)
                {
                    for (int k = 0; k < a.m; k++)
                    {
                        result[i, j] = result[i, j] + a[i, k] * b[k, j];
                    }
                }
            }

            return result;
        }

        public static Matrix operator &(Matrix a, int x)
        {
            var result = new Matrix(a.n, a.m);
            for (int i = 0; i < a.n; i++)
            {
                for (int j = 0; j < a.m; j++)
                {
                    result[i, j] = a[i, j] * x;
                }
            }

            return result;
        }

        private static void GetCofactor(Matrix a, Matrix temp, int p, int q, int N)
        {
            int i = 0, j = 0;

            for (int row = 0; row < N; row++)
            {
                for (int col = 0; col < N; col++)
                {
                    if(row != p && col != q)
                    {
                        temp[i, j] = a[row, col];

                        if(j == N - 1)
                        {
                            j = 0;
                            i++;
                        }
                    }
                }
            }
        }

        public static double Determinant(Matrix a, int N)
        {
            double D = 0;

            if (N == 1)
                return a[0, 0];

            var temp = new Matrix(a.n, a.m);
            int sign = 1;

            for (int f = 0; f < N; f++)
            {
                GetCofactor(a, temp, 0, f,a.n);
                D += sign * a[0, f] * Determinant(temp, N - 1);

                sign = -sign;
            }

            return D;
        }

        private static void Adjoint (Matrix a, Matrix adj)
        {
            if(a.n == 1)
            {
                adj[0, 0] = 1;
                return;
            }

            int sign;
            Matrix temp = new Matrix(a.n, a.m);

            for (int i = 0; i < a.n; i++)
            {
                for (int j = 0; j < a.m; j++)
                {
                    GetCofactor(a, temp, i, j, a.n);
                    sign = ((i + j) % 2 == 0) ? 1 : -1;
                    adj[i, j] = (sign) * (Determinant(temp, a.n - 1));
                }
            }
        }

        public static Matrix Inverse(Matrix a)
        {
            Matrix b = new Matrix(a.n, a.m);
            double det = Determinant(a, a.n);
            if(det == 0)
            {
                throw new Exception();
            }

            Matrix adj = new Matrix(a.n, a.m);
            Adjoint(a, adj);

            for (int i = 0; i < a.n; i++)
            {
                for (int j = 0; j < a.m; j++)
                {
                    b[i, j] = adj[i, j] / det;
                }
            }

            return b;
        }
    }
}
