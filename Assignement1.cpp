#include <iostream>
#include <string>

using namespace std;

int main()
{
    int age = 50;
    float price(99.67);
    double pi{3.141592};
    char grade('A');
    string name{"Wissal"};
    bool passed = true;
    int yearOfBirth = 2006;
    double temperature{77.876535};

    cout << "Age: " << age << endl;
    cout << "Price: " << price << endl;
    cout << "Pi: " << pi << endl;
    cout << "Grade: " << grade << endl;
    cout << "Name: " << name << endl;
    cout << "Passed: " << passed << endl;
    cout << "YearOfBirth: " << yearOfBirth << endl;
    cout << "Temperature: " << temperature << endl;

    cout << "The new values are:" << endl;
    age = 19;
    price = 56.67;
    pi = 9.874592653;
    grade = 'C';
    name = "Ghita";
    passed = false;
    yearOfBirth = 2010;
    temperature = 100.8769;

    cout << "Age: " << age << endl;
    cout << "Price: " << price << endl;
    cout << "Pi: " << pi << endl;
    cout << "Grade: " << grade << endl;
    cout << "Name: " << name << endl;
    cout << "Passed: " << passed << endl;
    cout << "YearOfBirth: " << yearOfBirth << endl;
    cout << "Temperature: " << temperature << endl;

    return 0;
}