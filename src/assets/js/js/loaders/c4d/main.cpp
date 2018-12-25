
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This code is an example of how to use the Melange SDK and openGL to display an object and color texcture in a .c4d file
//The freeglut, glew, & FreeImage libs compatible with VS2013_x64 are included in the project so you don't need to install them
//The files "cube.c4d" & "cubeTexture.bmp" are included with the files. Copy them to your desktop
//Only .bmp files are supported
//*The c4dFile path in the code is hard coded to my own desktop path. So you will need to change the code to target your desktop

//NOTE: In the cube.c4d file. Even the material's link to the cubeTexture.bmp image is using a full file path
//      You will need to change the path there too to target your desktop. But be carefull!! You must use a full file path
//      If the texture path is local like this: cubeTexture.bmp this code will not work!! 
//      I'm using that path to load the texture so that openGL can find it

//In a more polished project. I would have used text fields to hold the paths, rather than harded coded ones
//And other types of image formats would be suppoted other than .bmp
//But that would require using a specific GUI app like Qt or Win 32. And would make the code much longer
//This project is just a quick and dirty example to:
//                                                  -Grab an object from a .c4d file and get it's material
//                                                  -Get the texture image from the material's color channel
//                                                  -Display the object with that texture image using openGL 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <iostream>

#include "c4d_file.h"
#include "default_alien_overloads.h"  //Required to use the melange SDK functions

using namespace melange;
void GetWriterInfo(Int32 &id, String &appname)
{ 
    id = 1234567; //Temporary ID ONLY!!!
    appname = "My Melange Example";
}

//We will use glew to handle the shader stuff (*This must be listed first before glut or freeglut)
#define GLEW_STATIC
#include "glew\include\GL\glew.h"

#include "freeglut\include\GL\freeglut.h"
#include "FreeImage\x64\FreeImage.h"


char title[] = "C4D Mesh Loader";

String c4dFile = "C:\\Users\\user\\Desktop\\cube.c4d";  //<---Change this to where your target c4d file is located!!!

BaseDocument *doc = nullptr;
BaseObject *obj = nullptr;
PolygonObject *pobj = nullptr;
LONG polyCount = 0;
UVWTag *uvs = nullptr;
UVWStruct res;
float scale = 100;
GLfloat angle = 0.0f;         //The Rotational angle for the object
int refreshMills = 15;        //The refresh interval in milliseconds

//This custom method only works with .bmp images
GLuint LoadTexture(const char *filename)
{
    //I'm only loading the image with FreeImage here to get the width ad height values
    FreeImage_Initialise();    
    FIBITMAP *srcImg = FreeImage_Load(FIF_BMP, filename, PNG_DEFAULT);
    int width = FreeImage_GetWidth(srcImg);
    int height = FreeImage_GetHeight(srcImg);    
    FreeImage_Unload(srcImg);
    FreeImage_DeInitialise();


    //Load the image with fopen using the width and height values we got above
    GLuint texture;    
    unsigned char *data;
    FILE *file = fopen(filename, "rb");
    if (file == NULL) return 0;

    data = (unsigned char *)malloc(width * height * 3);
    fread(data, width * height * 3, 1, file);
    fclose(file);

    for (int i = 0; i < width * height; ++i)
    {
        int index = i * 3;
        unsigned char B, R;
        B = data[index];
        R = data[index + 2];

        data[index] = R;
        data[index + 2] = B;
    }

    glGenTextures(1, &texture);
    glBindTexture(GL_TEXTURE_2D, texture);
    glTexEnvf(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_NEAREST);

    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    gluBuild2DMipmaps(GL_TEXTURE_2D, 3, width, height, GL_RGB, GL_UNSIGNED_BYTE, data);
    free(data);

    return texture;
}

void loadShader() 
{
#define STRINGIFY(A) #A

    const GLchar *source = STRINGIFY(uniform sampler2D tex; void main()
    {  
        vec4 s1 = texture2D(tex, gl_TexCoord[0].st);
        gl_FragColor = s1;
    });

    GLuint program = glCreateProgram();
    GLuint shader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(shader, 1, &source, NULL);
    glCompileShader(shader);
    glAttachShader(program, shader);
    glLinkProgram(program);

    GLuint texLocation = glGetUniformLocation(program, "tex");

    glUseProgram(program);
}

void initLight()
{
    GLfloat light_specular[] = { 0.5, 0.5, 0.5, 1.0 };
    GLfloat light_diffuse[] = { 0.5, 0.5, 0.5, 1.0 };
    GLfloat light_ambient[] = { 0.5, 0.5, 0.5, 1.0 };
    GLfloat light_position[] = { 0.0, 0.5, 0.0, 0.0 };

    glLightfv(GL_LIGHT0, GL_AMBIENT, light_ambient);
    glLightfv(GL_LIGHT0, GL_DIFFUSE, light_diffuse);
    glLightfv(GL_LIGHT0, GL_POSITION, light_position);
    glLightfv(GL_LIGHT0, GL_SPECULAR, light_specular);
    glDisable(GL_LIGHTING);
    glEnable(GL_LIGHT0);
    glEnable(GL_LIGHTING);   
    glShadeModel(GL_SMOOTH);
}

void initMaterial()
{
    GLfloat Ambient[] = { 0.2, 0.2, 0.2, 1.0 };  // (0.2,0.2,0.2,1) dark grey
    GLfloat Diffuse[] = { 0.8, 0.5, 0.6, 1.0 };  // (0.8,0.8,0.8,1)
    GLfloat Specular[] = { 0.4, 0.4, 0.4, 1 };   // (0,0,0,1)
    GLfloat SpecularExp[] = { 10 };              // (0)
    GLfloat Emission[] = { 0, 0, .2, 1 };         // (0,0,0,1)
    
    glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT, Ambient);
    glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, Diffuse);
    glMaterialfv(GL_FRONT_AND_BACK, GL_SPECULAR, Specular);
    glMaterialfv(GL_FRONT_AND_BACK, GL_SHININESS, SpecularExp);
    glMaterialfv(GL_FRONT_AND_BACK, GL_EMISSION, Emission);

    glColorMaterial(GL_FRONT_AND_BACK, GL_DIFFUSE);
    glEnable(GL_COLOR_MATERIAL);
}

void initGL() 
{
    glClearColor(0.5f, 0.5f, 0.5f, 1.0f); // Set background color to black and opaque
    glClearDepth(1.0f);                   // Set background depth to farthest
    glEnable(GL_DEPTH_TEST);   // Enable depth testing for z-culling
    glDepthFunc(GL_LEQUAL);    // Set the type of depth-test
    glShadeModel(GL_SMOOTH);   // Enable smooth shading
    glHint(GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);  //perspective corrections
}

void display()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); //Clear color and depth buffers
    glMatrixMode(GL_MODELVIEW);                         //To operate on model-view matrix

    //Control the view's camera values
    glLoadIdentity();                      //Reset the model-view matrix
    glTranslatef(0.0f, -1.5f, -5.0f);      //Position the object in the view
    glRotatef(180, 0.0f, 1.0f, 0.0f);      //Rotate the mesh to face forward(Because OpenGL uses a different Axis order than C4D)
    glRotatef(angle, 0.0f, 1.0f, 0.0f);    //Spin the object in the view    
    
    //glColorMaterial(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE);    
    //glEnable(GL_COLOR_MATERIAL);   
    //glNormal3f(0.0f, 0.0f, 1.0f);
    //glEnable(GL_NORMALIZE);
	
	//Draw the polygons of the C4D object
    glBegin(GL_QUADS);  
    UVWHandle UVpolys = uvs->GetDataAddressW();  //The array of polygon positions in the UVWtag
    for (int i=0; i < polyCount; i++)
    {        
        CPolygon poly = pobj->GetPolygonW()[i];
        Vector pa = pobj->GetPointW()[poly.a] / scale;
        Vector pb = pobj->GetPointW()[poly.b] / scale;
        Vector pc = pobj->GetPointW()[poly.c] / scale;
        Vector pd = pobj->GetPointW()[poly.d] / scale;
        
        uvs->Get(UVpolys, i, res); //Get the texture coords from the C4D UVW tag 

        //lower left
        glTexCoord2f(res.a.x * 1, res.a.y * -1);
        glVertex3f(pa.x, pa.y, pa.z);
        //upper left 
        glTexCoord2f(res.b.x * 1, res.b.y * -1);
        glVertex3f(pb.x, pb.y, pb.z);
        //upper right 
        glTexCoord2f(res.c.x * 1, res.c.y * -1);
        glVertex3f(pc.x, pc.y, pc.z);
        //lower right
        glTexCoord2f(res.d.x * 1, res.d.y * -1);
        glVertex3f(pd.x, pd.y, pd.z);
	
    //Just some random notes here for myself	
    //    //Calculate the polygon's normal
    //    Vector V1 = (pb - pa).GetNormalized();
    //    Vector V2 = (pc - pa).GetNormalized();
    //    Vector surfaceNormal;
    //    surfaceNormal.x = (V1.y*V2.z) - (V1.z - V2.y);
    //    surfaceNormal.y = (V1.z * V2.x) - (V1.x * V2.z);
    //    surfaceNormal.z = (V1.x*V2.y) - (V1.y*V2.x);
    //    //std::cout << surfaceNormal.x << " " <<surfaceNormal.y << " " <<surfaceNormal.z << std::endl;

    //    float DotProduct = V1.x * V2.x + V1.y * V2.y + V1.z * V2.z;		
    }
    glEnd();

    glutSwapBuffers();  // Swap the front and back frame buffers (double buffering)

    //Update the rotational angle after each refresh
    angle += 0.7f;
}

void redraw(GLsizei width, GLsizei height) 
{
    if (height == 0) height = 1;  //Prevent divide by 0 errors
    GLfloat aspect = (GLfloat)width / (GLfloat)height;

    //Set the viewport to cover the new window
    glViewport(0, 0, width, height);

    //Set the aspect ratio of the clipping volume to match the viewport
    glMatrixMode(GL_PROJECTION);  //To operate on the Projection matrix
    glLoadIdentity();             //Reset

    //Enable perspective projection with fovy, aspect, zNear and zFar
    gluPerspective(65.0f, aspect, 0.1f, 100.0f);
}

void timer(int value) 
{
    glutPostRedisplay();                   //Post re-paint request to activate display()
    glutTimerFunc(refreshMills, timer, 0); //The next timer call milliseconds later
}


int main(int argc, char** argv) 
{
    //Handle the C4D Object loading stuff
    doc = LoadDocument(c4dFile, SCENEFILTER_OBJECTS | SCENEFILTER_MATERIALS);
    if (!doc) return false;

    obj = doc->GetFirstObject();
    if (!obj || obj->GetType() != Opolygon) return false;

    pobj = (PolygonObject *)obj;
    polyCount = pobj->GetPolygonCount();

    BaseTag *uvTag = obj->GetTag(Tuvw);
    uvs = (UVWTag*)uvTag;

    TextureTag *texTag = (TextureTag*)obj->GetTag(Ttexture);
    if (!texTag) return false;

    //Get the assigned material from the tag
    BaseMaterial *mat = texTag->GetMaterial();
    if (!mat) return false; 

    //Get the color channel's texture image path, if it exists
	//NOTE: the path set in the material's color channel must be a full path for the code to work!!
    BaseShader *shdr = mat->GetFirstShader();    
    if (!shdr || !shdr->IsInstanceOf(Xbitmap)) return false;
    Filename fname = shdr->GetFileName();
    Char *imgName = fname.GetString().GetCStringCopy();


	
	//OpenGL stuff here
	//Init freeglut and glew so we can use them and set some of the options
    glutInit(&argc, argv);            // Initialize GLUT
    glutInitDisplayMode(GLUT_DOUBLE); // Enable double buffered mode
    glutInitWindowSize(640, 480);     // Set the window's initial width & height
    glutInitWindowPosition(50, 50);   // Position the window's initial top-left corner
    glutCreateWindow(title);          // Create window with the given title
    glutDisplayFunc(display);         // Register callback handler for window re-paint event
    glutReshapeFunc(redraw);          // Register callback handler for window re-size event
    initGL();                         // Our own OpenGL initialization
    glutTimerFunc(0, timer, 0);       // First timer call immediately

    //You Must Init() glew before you can use it!!!
    GLenum err = glewInit(); 
	
	//Execute the shaders
	initLight();
    initMaterial();	

    //Get some version info in this code block
    fprintf(stdout, "Using GLEW %s\n", glewGetString(GLEW_VERSION));
    if (!GLEW_VERSION_2_1) std::cout << "Not version 2.1 compatible!!" << std::endl;

    const GLubyte *p = glGetString(GL_VERSION);
    std::cout << "GL Version: " << p << std::endl;
    const GLubyte *q = glGetString(GL_SHADING_LANGUAGE_VERSION);
    std::cout << "GL Shading Language Version: " << q << std::endl;

    std::cout << imgName << std::endl;     
    GLuint texture = LoadTexture(imgName);    
    loadShader();
    delete imgName; //free the memory used;
    
    glutMainLoop();  //Enter the infinite processing loop that runs the openGL drawing

    BaseDocument::Free(doc);
    system("pause");
    return 0;
}