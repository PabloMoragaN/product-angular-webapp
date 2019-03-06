import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../../services/productos.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../../services/global';

@Component({

    selector: 'producto-edit',
    templateUrl: '../views/producto-edit.html',
    providers: [ProductoService]
})

export class ProductoEditComponent {
    public titulo: string;
    public producto: Producto;
    public filesToUpload;
    public resultUpload;
    public hideImg;

    constructor(private _productoService: ProductoService, private _route: ActivatedRoute, private _router: Router) {
        this.titulo = 'Editar producto';
        this.producto = new Producto(1,"","",1,"");


    }

    hideImage() {
        this.hideImg = true;
    }

    ngOnInit() {
        console.log(`Se ha cargado el componente ${this.titulo}`);
        this.hideImg = false;

        this.getProducto();
    }

    getProducto() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._productoService.getProducto(id).subscribe(
                response => {
                    if (response.code == 200) {
                        this.producto = response.data;
                    } else {
                        this._router.navigate(['/productos']);
                    }


                },
                error => {
                    console.log(<any>error);
                }


            );


        })
    }


    ////NUEVO CODE

    onSubmit() {
        console.log(this.producto);
        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._productoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).then((result) => {
                this.resultUpload = result;
                this.producto.imagen = this.resultUpload.filename;
                this.updateProducto();
            },

                (error) => {
                    console.log(error);
                });
        } else {
            this.updateProducto();

        }
    }


    updateProducto() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._productoService.editProducto(id, this.producto).subscribe(
                result => {

                    if (result.code == 200) {
                        this._router.navigate(['/producto',id]);
                    } else {
                        
                        console.log(result);
                    }
                },
                error => {
                    
                    console.log(<any>error);
                }

            );
        });

    }




    fileChangeEvent(fileInput: any) {

        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }





}

