import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animateTo } from 'src/utils/animateTo';
import { AnimationInterval } from 'src/utils/animationInterval';
import { ProductService } from '../../product.service';
import { marked } from 'marked';
import { GameDetail } from './ProductDetailUtils';
import { Observable, tap } from 'rxjs';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent
  extends GameDetail
  implements OnInit, OnDestroy
{
  controller = new AbortController();
  animationInterval: AnimationInterval | undefined;
  product$ = this.getProductDetail();
  reviews$: Observable<any> | undefined;
  classifications: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService
  ) {
    super();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      this.animationInterval.end();
      this.animationInterval.clear();
    }
  }

  ngOnInit(): void {}

  getProductDetail() {
    let gameId = '';
    this.route.params.subscribe((values) => (gameId = values['id']));
    return this.productService.getProductDetail(gameId).pipe(
      tap((product) => {
        this.animate();
        this.reviews$ = this.reviewService
          .getProductReviews(product._id)
          .pipe(tap((reviews) => this.getReviewsList(reviews)));
      })
    );
  }

  getLogo(images: any[]) {
    return images.find((image) => image.type === 'logo' && image.url !== '');
  }

  formatTag(tag: string, trailing: boolean) {
    const end = trailing ? ', ' : '';
    return (
      tag.substring(0, 1).toUpperCase() + tag.substring(1, tag.length) + end
    );
  }

  getMarked(text: string) {
    const parsedMark = marked.parse(text);
    return parsedMark;
  }

  getReviewsList(reviews: any[]) {
    const classify = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      classify[review.rating as 5 | 4 | 3 | 2 | 1] += 1;
    });

    this.classifications = Object.entries(classify).map((c) => ({
      key: c[0],
      value: (c[1] / reviews.length) * 100,
    })).reverse();
  }

  /* animating section */
  async animate() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 200)
    );
    const carousel = document.querySelector(
      '.game-carousel .big-thumbnail'
    ) as HTMLElement;
    const smallPreviewItem = document.querySelectorAll('.small-preview-item');
    if (carousel) {
      const reset = carousel.querySelectorAll('li').length;
      let currentIndex = 0;
      this.animationInterval = new AnimationInterval(
        5000,
        this.controller,
        () => {
          if (currentIndex === 0) {
            smallPreviewItem
              .item(smallPreviewItem.length - 1)
              .classList.remove('active');
          } else {
            smallPreviewItem.item(currentIndex - 1).classList.remove('active');
          }
          smallPreviewItem.item(currentIndex).classList.add('active');
          this.slideToNext(carousel, currentIndex);
          if (currentIndex !== reset - 1) {
            currentIndex += 1;
          } else {
            currentIndex = 0;
          }
        },
        true
      ).start();
    }
  }

  slideToNext(carousel: HTMLElement, currentIndex: number) {
    animateTo(
      carousel,
      [
        {
          transform: `translateX(${currentIndex !== 0 ? '-' : ''}${
            currentIndex * 100
          }%)`,
        },
      ],
      {
        easing: 'ease-in',
        duration: 1000,
        fill: 'forwards',
      },
      this.controller.signal
    );
  }
  /* end animating section */

  /* styling */
  descriptionColorize() {
    const items = document.querySelector('.description')?.querySelectorAll('*');
    items?.forEach((item) => {
      (item as HTMLElement).style.color = 'hsla(0, 0%, 200%, 0.6)';
    });
  }
  /* end styling section */
}
