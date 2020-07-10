import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-article',
  templateUrl: '../new-article/new-article.component.html',
  styleUrls: ['./edit-article.component.css'],
  providers: [ArticleService],
})
export class EditArticleComponent implements OnInit {
  public article: Article;
  public status: string;
  public pageTitle: string;
  public isEdit: boolean;
  public url: string;
  public id: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: Global.url + 'uploadImage',
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit',
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', null, null);
    this.pageTitle = 'Editar artículo';
    this.isEdit = true;
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;
          swal(
            'Artículo editado',
            'El artículo se ha editado correctamente',
            'success'
          );
          this._router.navigate(['/blog/articulo/', this.id]);
        } else {
          this.status = 'error';
        }
      },
      (err) => {
        console.log(err);
        this.status = 'error';
      }
    );
  }

  uploadImage(data) {
    let image = data.body.image;
    this.article.image = image;
  }

  getArticle() {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this.id = id;
      this._articleService.getArticle(id).subscribe(
        (response) => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        (error) => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });
  }
}
