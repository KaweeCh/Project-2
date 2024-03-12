import { Injectable, OnInit } from '@angular/core';
import { Constant } from '../config/constaint';
import { HttpClient } from '@angular/common/http';
import { count, lastValueFrom } from 'rxjs';
import { Register, Statistic, User, Vote, imageUpload } from '../model/model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string;

  constructor(private constant: Constant, private http: HttpClient) {
    this.url = this.constant.API_ENDPOINT;

  }

  public async getUser() {
    const response = await lastValueFrom(
      this.http.get<User[]>(`${this.url}/users`));
    // console.log(response);
    return response
  }
  public async getImage() {
    const response = await lastValueFrom(
      this.http.get<imageUpload[]>(`${this.url}/images`));
    return response
  }

  public async getTopImage() {
    const response = await lastValueFrom(
      this.http.get<imageUpload[]>(`${this.url}/images/top10`));
    return response
  }


  public async uploadImage(file: File): Promise<imageUpload> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    try {
      const response = await lastValueFrom(
        this.http.post<imageUpload>(`${this.url}/upload`, formData)
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error uploading image', error);
      throw error;
    }
  }

  public async getUserbyId(userId: number) {
    const response = await lastValueFrom(
      this.http.get(`${this.url}/users/${userId}`));
    return response as User
  }

  public async getImagebyId(imageID: number) {
    const response = await lastValueFrom(
      this.http.get(`${this.url}/images/${imageID}`));
    return response as imageUpload
  }

  public async deleteImagebyId(imageID: number) {
    const response = await lastValueFrom(
      this.http.delete(`${this.url}/images/${imageID}`));
    return response
  }




  public async register(body: Register) {
    const requestBody = {
      username: body.username,
      password: body.password,
      email: body.email,
      type: "user",
    };

    try {
      const response = await lastValueFrom(
        this.http.post<User[]>(`${this.url}/users`, requestBody)
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูล', error);
      throw error;
    }
  }

  public async vote(body: Vote) {
    const requestBody = {
      userID: body.userID,
      imageID: body.imageID,
      elorating: body.elorating
    }

    try {
      const response = await lastValueFrom(
        this.http.post<Vote>(`${this.url}/vote`, requestBody)
      );
      return response;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูล', error);
      throw error;
    }
  }

  //ยังไม่เสร็จ
  
  public updateScore(id: number, score: number) {
    let body = {
      count : score
    }
    this.http.put(this.url + "/images/" + id , body).subscribe();
  }

  public async getStatistic(imageID: number, day: number) {
    try {
      const response = await lastValueFrom(
        this.http.get<Statistic[]>(`${this.url}/statistics/${imageID}/${day}`)
      );
      console.log(response);
      return response ;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }

}

