#include "scene.h"
#include "image.h"
#include <iostream>

using namespace std;

//Initializes this Scene object to be able to hold "max" number of images with indices 0 through max-1. 
Scene::Scene (int max)
{
	this->max = max;
	imagelist = new Image*[max];
	Scene::x = new int[max];
	Scene::y = new int[max];
	for (int i=0; i<max; i++)
	{
		imagelist[i]=NULL;
		y[i]=0;
		x[i]=0;
	}
}

//Frees all space that was dynamically allocated by this Scene. 
Scene::~Scene()
{
	clear();	
}

//The copy constructor makes this Scene an independent copy of the source. 
Scene::Scene (const Scene &source)
{
	copy(source);
}

void Scene::copy(const Scene &source)
{
	max = source.max;
	x = new int[max];
	y = new int[max];
	imagelist = new Image*[max];

	for(int i=0; i<max; i++)
	{
		x[i]=source.x[i];
		y[i]=source.y[i];
		if(source.imagelist[i]!=NULL)
		{
			imagelist[i]=new Image();
			*imagelist[i]=*source.getpicture(i);
		}	
		else
			imagelist[i]=NULL;
	}
}

void Scene::clear()
{
	delete[] x;
	delete[] y; 
	for(int i=0; i<max; i++)
	{
		if(imagelist[i]!=NULL)
			delete imagelist[i];
	}
	delete[] imagelist;
	// for(int i=0; i<max; i++)
	// 	imagelist[i]=NULL;	
}

//The assignment operator for the Scene class. 
const Scene & Scene::operator= (const Scene &source)
{
	if(this==&source)
		return *this;
	clear();
	copy(source);	
	return *this;
}

//Modifies the size of the array of Image pointers without changing their indices. 
void Scene::changemaxlayers (int newmax)
{
	if(newmax<max)
	{
		for(int i=newmax; i<max; i++)
			if(imagelist[i]!=NULL)
			{
				cout << "invalid newmax" << endl;	
				return;
			}
	}
	Image ** temp = new Image*[newmax];
	int * tempx = new int[newmax];
	int * tempy = new int[newmax];

	for (int i=0; i<newmax; i++)
	{
		temp[i]=NULL;
		tempy[i]=0;
		tempx[i]=0;
	}
	for (int i=0; i<max; i++)
	{
		if(imagelist[i]!=NULL)
		{
			temp[i]=new Image();
			*temp[i]=*(imagelist[i]);
			delete imagelist[i];
		}
			
		tempx[i]=x[i];
		tempy[i]=y[i];
	}
	//cout<<"printing y... :"<<y[6]<<endl;
	delete[] x;
	delete[] y;
	//cout<<"printing y... :"<<y[6]<<endl;
	delete[] imagelist;

	x=tempx;
	y=tempy;
	//cout<<"printing y... :"<<y[6]<<endl;
	imagelist = temp;

	max=newmax;

	
}

//This function will add a picture to the scene, by placing it in the array cell corresponding to the given index, and storing its x coordinate and y coordinate.
void Scene::addpicture (const char *FileName, int index, int x, int y)
{
	if(index>max)
	{
		cout << "index out of bounds" << endl;
		return;
	}
	//cout<<"Here 1"<<endl;
	Image readTo;
	readTo.readFromFile(FileName);
	//delete imagelist[index];
	imagelist[index] = new Image();
	*imagelist[index]=readTo;
	//cout<<"Here 2"<<endl;
	this->x[index]=x;
	this->y[index]=y;
	//cout<<"This looks fine"<<endl;
}

//Moves an image from one layer to another
void Scene::changelayer (int index, int newindex)
{
	if(index==newindex)
		return;
	if(index>max || newindex>max || index<0 || newindex<0)
	{
		cout << "invalid index" << endl;
		return;
	}
	if(imagelist[newindex]!=NULL)
		delete imagelist[newindex];
	imagelist[newindex]=imagelist[index];
	x[newindex]=x[index];
	y[newindex]=y[index];
	imagelist[index]=NULL;
}

//Changes the x and y coordinates of image in the specified layer
void Scene::translate (int index, int xcoord, int ycoord)
{
	x[index]=xcoord;
	y[index]=ycoord;
}

//Deletes the image at the given index
void Scene::deletepicture (int index)
{
	if(index>max || index<0 || imagelist[index]==NULL)
	{
		cout << "invalid index" << endl;
		return;
	}
	delete imagelist[index];
	imagelist[index]=NULL;
}

//This function will return a pointer to the Image at the specified index, not a copy of it
Image * Scene::getpicture (int index) const
{
	if(index>max || index<0)
	{
		cout << "invalid index" << endl;
	}
	return imagelist[index];
}

//Draws the whole scene on one Image and returns that Image by value. 
Image Scene::drawscene () const
{
	int maxx, maxy;
	Image final;
	maxx=0;
	maxy=0;
	for(int i=0; i<max; i++)
	{
		if(imagelist[i]!=NULL)
		{
			if(x[i]+(imagelist[i]->width())>maxx)
			{
				maxx = x[i]+(imagelist[i]->width());
			}
			if(y[i]+(imagelist[i]->height())>maxy)
			{
				maxy = y[i]+(imagelist[i]->height());
			}
		}
	}
	cout<<"max x : "<<maxx<<endl;
	cout<<"max y : "<<maxy<<endl;
	final.resize(maxx,maxy);
	for(int i=0; i<max; i++)
	{
		if(imagelist[i]!=NULL)
		{
			for(int row=y[i]; row<(y[i]+(imagelist[i]->height())); row++)
			{
				for(int col=x[i]; col<(x[i]+(imagelist[i]->width())); col++)
				{
					//cout<<"Reached inside"<<endl;
					*(final(col,row)) = *(*imagelist[i])(col-x[i],row-y[i]);
				}
			}
		}
	}
	//cout<<"out of here"<<endl;
	// int maxx, maxy;
	// maxx=0;
	// maxy=0;
	// for(int i=1; i<max; i++)
	// {
	// 	if(imagelist[i]!=NULL)
	// 	{
	// 		if((x[i]+((*imagelist[i]).width()))>maxx)
	// 			maxx = x[i]+((*imagelist[i]).width());
				
	// 		if((y[i]+((*imagelist[i]).height()))>maxy)
	// 			maxy = y[i]+((*imagelist[i]).height());
	// 	}
	// }
	// //cout<<"Reached here"<<endl;
	// Image final;
	// final.resize(maxx, maxy);
	// //cout<<"Next step"<<endl;
	// for(int i=0; i<max; i++)
	// {
	// 	cout<<"Inside"<<endl;
	// 	if(imagelist[i]!=NULL)
	// 	{
	// 		cout<<"Passed inside i"<<endl;
	// 		for(int m=x[i]; m<(x[i]+(*imagelist[i]).width()); m++)
	// 		{
	// 			for(int n=y[i]; n<(y[i]+(*imagelist[i]).height()); n++)
	// 			{
	// 				cout<<"Inside the final for"<<endl;
	// 				if((*imagelist[i])(m,n)!=NULL)
	// 				{
	// 					cout<<"The final if"<<endl;
	// 					*(final(m,n)) = *(*imagelist[i])(m,n);
	// 					cout<<"The final hurdel cleared"<<endl;
	// 				}
						
	// 			}	
	// 		}		
	// 	}
	// }
	return final;
	
}




