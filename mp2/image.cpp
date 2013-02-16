#include "image.h"
#include "rgbapixel.h"

#include <iostream>

using namespace std;

void Image::flipleft()
{
	RGBAPixel * temp = new RGBAPixel;
	for(int row=0; row < this->height(); row++)
		for(int col=0; col < this->width()/2; col++)
		{
			*temp = *(*this)(col,row);
			*(*this)(col,row) = *(*this)(this->width()-col-1,row);
			*(*this)(this->width()-col-1,row)=*temp;
		}
	delete temp;
}

void Image::adjustbrightness(int r, int g, int b)
{
	for(int row=0; row < this->height(); row++)
		for(int col=0; col < this->width(); col++)
		{
			if(((*this)(col,row)->red+r)>255)
				(*this)(col,row)->red = 255;
			else if (((*this)(col,row)->red+r)<0)
				(*this)(col,row)->red=0;
			else
				(*this)(col,row)->red+=r;

			if(((*this)(col,row)->green+g)>255)
				(*this)(col,row)->green = 255;
			else if (((*this)(col,row)->green+g)<0)
				(*this)(col,row)->green=0;
			else
				(*this)(col,row)->green+=g;

			if(((*this)(col,row)->blue+b)>255)
				(*this)(col,row)->blue = 255;
			else if (((*this)(col,row)->blue+b)<0)
				(*this)(col,row)->blue=0;
			else
				(*this)(col,row)->blue+=b;
		}	
}

void Image::invertcolors()
{
	for(int row=0; row < this->height(); row++)
		for(int col=0; col < this->width(); col++)
		{
			(*this)(col,row)->red=255-(*this)(col,row)->red;
			(*this)(col,row)->green=255-(*this)(col,row)->green;
			(*this)(col,row)->blue=255-(*this)(col,row)->blue;
		}	
}