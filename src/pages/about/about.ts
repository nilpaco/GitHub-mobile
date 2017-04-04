import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { GitHubService } from '../services/github-service';
import { RepoDetailPage } from '../repo-detail/repo-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [GitHubService]
})
export class AboutPage {
  public foundRepos;
  username: string = '';

  constructor(public navCtrl: NavController, private github: GitHubService) {

  }

  onInput() {
    this.github.getRepos(this.username).subscribe(
      data => {
        this.foundRepos = data.json();
      },
      err => this.foundRepos = [{name:'User not found.'}],
      () => console.log('getRepos completed')
    )
  }

  goToDetails(repo) {
    this.navCtrl.push(RepoDetailPage, {repo: repo});
  }


}
