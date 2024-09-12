describe("template spec", () => {
  // it("input username", () => {
  //   cy.visit("/");
  //   // cy.visit("https://sandbox.moodledemo.net/login/index.php");
  //   cy.get("#username").type("admin");
  //   cy.get("#password").type("sandbox");
  //   cy.get("#password").click();
  // });

  // it("Query Database", () => {
  //   cy.task("queryDatabase", "SELECT * FROM sandbox.user_info").then(
  //     (result) => {
  //       cy.log("Query Result: " + JSON.stringify(result));
  //       expect(result).to.have.length.of.at.least(1);
  //       // ทำการ assert หรือใช้งานข้อมูลตามต้องการ
  //       const userRole = result[0].user_role;
  //       cy.log(`User role: ${userRole}`);
  //       expect(userRole).to.equal("manager");
  //     }
  //   );
  // });

  it("should fetch user info with variables", () => {
    const query = `
      query GetUserInfo($userId: ID!) {
        getUserInfo(user_id: $userId) {
          user_id
          username
          tel
        }
      }
    `;

    const variables = {
      userId: "2", // ค่าตัวแปรที่คุณต้องการส่ง
    };

    cy.request({
      method: "POST",
      url: "http://localhost:4000/", // URL ของ GraphQL API
      body: {
        query: query,
        variables: variables,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      cy.log(response.body.data.getUserInfo.tel);
      console.log(response.body.data.getUserInfo.tel);
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("getUserInfo");
      expect(response.body.data.getUserInfo).to.have.property("username");
      expect(response.body.data.getUserInfo.username).to.eq("admin");
    });
  });

  it("Should update user info", () => {
    const query = `
    mutation(
      $user_id: ID!, 
      $username: String, 
      $password: String, 
      $user_role: String, 
      $tel: String) { 
          updateUser(
              user_id: $user_id, 
              username: $username, 
              password: $password, 
              user_role: $user_role, 
              tel: $tel) { 
                  user_id 
                  username 
                  tel 
              } 
            }
  `;

    const variables = {
      user_id: "5", // ค่าตัวแปรที่คุณต้องการส่ง
      username: "senior_dev",
      tel: "+66987654321",
    };

    cy.request({
      method: "POST",
      url: "http://localhost:4000/", // URL ของ GraphQL API
      body: {
        query: query,
        variables: variables,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const updatedUser = response.body.data.updateUser; // ต้องอ้างถึง mutation ที่ใช้ใน query
      cy.log(updatedUser.tel); // Log ค่า `tel` ที่ถูกอัปเดต
      console.log(updatedUser.tel);

      // ตรวจสอบสถานะของ response
      expect(response.status).to.eq(200);

      // ตรวจสอบว่าได้ข้อมูลจาก `updateUser` mutation ถูกต้อง
      expect(response.body.data).to.have.property("updateUser");
      expect(updatedUser).to.have.property("username");
      expect(updatedUser.username).to.eq("senior_dev");
      expect(updatedUser.tel).to.eq("+66987654321"); // ตรวจสอบค่าที่แก้ไข
    });
  });

  it("Should create new user to db", () => {
    const query = `
    mutation(
      $username: String!, 
      $password: String!, 
      $user_role: String!, 
      $tel: String!) { 
        createUser(
            username: $username, 
            password: $password, 
            user_role: $user_role, 
            tel: $tel) { 
                user_id username 
            } 
    }
  `;

    const variables = {
      username: "senior_sa",
      password: "sandbox",
      user_role: "sa",
      tel: "+66123456789",
    };

    cy.request({
      method: "POST",
      url: "http://localhost:4000/", // URL ของ GraphQL API
      body: {
        query: query,
        variables: variables,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const createdUser = response.body.data.createUser; // ต้องอ้างถึง mutation ที่ใช้ใน query
      cy.log(createdUser.tel); // Log ค่า `tel` ที่ถูกอัปเดต
      console.log(createdUser.tel);

      // ตรวจสอบสถานะของ response
      expect(response.status).to.eq(200);

      // ตรวจสอบว่าได้ข้อมูลจาก `updateUser` mutation ถูกต้อง
      expect(response.body.data).to.have.property("createUser");
      expect(createdUser).to.have.property("username");
      expect(createdUser.username).to.eq("senior_sa");
      // expect(createdUser.tel).to.eq("+66123456789"); // ตรวจสอบค่าที่แก้ไข
    });
  });
});
