#include <iostream>
using namespace std;
int main() {
    int x = 10;
    int* ptr = &x; // เก็บ address ของ x

    cout << "ค่าของ x: " << x << endl;           // แสดงค่าของ x
    cout << "ตำแหน่งของ x: " << &x << endl;    // แสดง address ของ x
    cout << "ค่าผ่าน ptr: " << *ptr << endl;   // เข้าถึงค่าผ่าน ptr
    cout << "ตำแหน่งใน ptr: " << ptr << endl;  // แสดง address ที่ ptr เก็บไว้


    int y = 20;
    ptr = &y; // เก็บ address ของ x

    cout << "ค่าของ y: " << x << endl;           // แสดงค่าของ x
    cout << "ตำแหน่งของ y: " << &x << endl;    // แสดง address ของ x
    cout << "ค่าผ่าน ptr: " << *ptr << endl;   // เข้าถึงค่าผ่าน ptr
    cout << "ตำแหน่งใน ptr: " << ptr << endl;  // แสดง address ที่ ptr เก็บไว้

    return 0;
}



