import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Register, UpdateUser } from '../../../../model/model';
import { ApiService } from '../../../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-profile-dialog',
  standalone: true,
  templateUrl: './update-profile-dialog.component.html',
  styleUrls: ['./update-profile-dialog.component.scss'],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class UpdateProfileDialogComponent implements OnInit {

  userData: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    private router: Router,
    public api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    this.setUser();
    console.log(this.userData);
  }

  setUser() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }

  }

  protected requestBody!: UpdateUser;

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFieldEmpty(...fields: string[]): boolean {
    if (fields.some((field) => !field)) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return true;
    }
    return false;
  }

  isPasswordMismatch(password: string, confirm: string): boolean {
    if (password !== confirm) {
      alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return true;
    }
    return false;
  }

  async changeUsername(newUsername: string, newEmail: string, confirmPassword: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let update: any = [];
    if (!newUsername) {
      alert("โปรดกรอกชื่อผู้ใช้งาน");
      return;
    }

    if (!emailRegex.test(newEmail)) {
      alert("รูปแบบของอีเมลไม่ถูกต้อง");
      return;
    }

    if (!confirmPassword) {
      alert("โปรดกรอกรหัสผ่านเพื่อยืนยันตัวตน");
      return;
    } else if (confirmPassword !== this.userData.password) {
      alert("รหัสผ่านไม่ถูกต้อง");
      return;
    }

    if (newUsername === this.userData.username) {
      console.log(newEmail);
      console.log(confirmPassword);
      update = [
        {
          "email": newEmail,
          "oldPassword": confirmPassword
        }
      ]
      
    } else {
      console.log("have username")
      update = [{
        "username": newUsername,
        "email": newEmail,
        "oldPassword": confirmPassword
      }]
      
    }
    let response = await this.api.userUpdate(this.userData.userID, update);
    if (response) {
      this.userData.username = newUsername;
      this.userData.password = confirmPassword;
      this.userData.email = newEmail;
  
      let userDataString = JSON.stringify(this.userData);
      localStorage.setItem("userData", userDataString);
  
      // แสดง Alert ว่าสำเร็จแล้ว
      window.alert('การอัปเดตข้อมูลเสร็จสมบูรณ์');
  
      // รีเฟรชหน้า
      window.location.reload();
  }
}

}
