import sys
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

def predict(n):
    return round(regressor.predict(poly_reg.fit_transform([[n]]))[0], 2)

dataset = pd.read_csv('Position_Salaries.csv')
X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, -1].values

poly_reg = PolynomialFeatures(degree=4)
X_poly = poly_reg.fit_transform(X)

regressor = LinearRegression()
regressor.fit(X_poly, y)

if __name__ == "__main__":
    position = float(sys.argv[1])
    print(predict(position))
