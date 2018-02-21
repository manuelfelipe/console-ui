import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { NewsComponent } from './news.component';
import { NEWS_SERVICE_MOCK_PROVIDER } from '../../../../shared/news/news.service.mock';
import { NewsService } from '../../../../shared/news/news.service';
import { NewsRequestFactory } from '../../../../shared/news/news-request.factory';
import { NewsResponseFactory } from '../../../../shared/news/news-response.factory';
import { NEWS_RESPONSE } from '../../../../shared/news/news.data';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let newsService: NewsService;
  let newsRequestFactory: NewsRequestFactory;
  let newsResponseFactory: NewsResponseFactory;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NewsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NewsComponent],
        providers: [
          NEWS_SERVICE_MOCK_PROVIDER,
          NewsRequestFactory,
          NewsResponseFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    newsRequestFactory = TestBed.get(NewsRequestFactory);
    newsResponseFactory = TestBed.get(NewsResponseFactory);

    newsService = TestBed.get(NewsService);
    spyOn(newsService, 'getNews').and.returnValue(Observable.of(NEWS_RESPONSE));

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all 4 news', () => {
    expect(component.recentNews.length).toBe(4);
  });

  it('should sort news properly', () => {
    /* tslint:disable max-line-length */
    const NOT_EXPECTED = {
      title: 'Nordelec Movement',
      synopsis: 'In November, everyone will have moved to Nordelec. Start packing!',
      text: 'In November, everyone will have moved to Nordelec. Start packing! In November, everyone will have moved to Nordelec. Start packing! In November, everyone will have moved to Nordelec. Start packing!',
      creationTimestamp: '2017-05-08T16:09:02.488Z'
    };

    expect(component.recentNews).not.toContain(NOT_EXPECTED);
  });
});
