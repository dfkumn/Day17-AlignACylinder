/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 */

import * as gfx from 'gophergfx'


export class ExampleApp extends gfx.GfxApp
{   
    public myCylinder: gfx.Mesh3;
    private cameraControls: gfx.OrbitControls;


    // --- Create the ExampleApp class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.myCylinder = new gfx.Mesh3();
    }

    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 10);
        this.cameraControls.setDistance(5);

        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.25, 0.25, 0.25));
        this.scene.add(ambientLight);
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.5, 0.5, 0.5));
        directionalLight.position.set(1, 1.5, 1)
        this.scene.add(directionalLight);

        const axes = gfx.Geometry3Factory.createAxes(2);
        this.scene.add(axes);

        this.myCylinder = gfx.Geometry3Factory.createCylinder(20, 0.1, 1);
        this.scene.add(this.myCylinder);

        // How do I set myClinder's localToParent matrix to make it align with some arbitrary axis?
        const axis = new gfx.Vector3(1,1,1);

        /*
        // using Matrix4.lookAt (aligns -Z with some arbirarty direction)
        const Rx = gfx.Matrix4.makeRotationX(Math.PI/2);
        const Tz = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, -0.5));
        const lookAtAxis = gfx.Matrix4.lookAt(new gfx.Vector3(0,0,0), axis, new gfx.Vector3(0,1,0));
        const M = gfx.Matrix4.multiplyAll(lookAtAxis, Tz, Rx);
        this.myCylinder.setLocalToParentMatrix(M, false);
        */

        // usign Matrix4.align (aligns a reference dir to some arbitrary direction)
        const Ty = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0.5, 0));
        const alignYwithAxis = gfx.Matrix4.makeAlign(new gfx.Vector3(0,1,0), axis);
        const M2 = gfx.Matrix4.multiply(alignYwithAxis, Ty);
        this.myCylinder.setLocalToParentMatrix(M2, false);
    }


    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);
    }
}
