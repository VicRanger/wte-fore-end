import fly from "./fly.js";
function Login() {
    console.log('getting the openid.');
    wx.login({
        success: function (res) {
            // console.log(res);
            fly.get("wte/openid/", {code: res.code})
                .then(data => {
                    wx.setStorageSync("userID", { openid: data.openid,code:res.code })
                    console.log("in Login:");
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });

}

function GetUserInfo() {
    console.log('getting the userinfo.');
    wx.getUserInfo({
        success: function (res) {
            // console.log(res);
            wx.setStorageSync("userInfo", {
                nickname: res.userInfo.nickName,
                avatar_url: res.userInfo.avatarUrl,
                language:res.userInfo.language,
                gender:res.userInfo.gender,
                country:res.userInfo.country,
                city:res.userInfo.city,
                province:res.userInfo.province
            });
        },
        fail: function (err) {
            console.log(err);
        }
    });
}

export {
    Login,
    GetUserInfo,
    UserReg,
    CheckUser
}