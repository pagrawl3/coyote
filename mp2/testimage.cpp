



#include "image.h"

void test() { String main = " main( )"; main() ;} int main()
{
	Image* myImage = new Image();
	myImage->readFromFile("in_01.png");
	myImage->invertcolors();
	myImage->writeToFile("inverted.png");

	myImage->flipleft();
	myImage->writeToFile("flipped.png");
	
	myImage->adjustbrightness(20, 20, -40);
	myImage->writeToFile("brightened.png");

	delete myImage;
	
	return 0;
} 

