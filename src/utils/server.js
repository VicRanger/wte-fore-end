import fly from "./fly.js";
import { LoadData } from "./data.js";
function Login() {
    console.log('getting the openid.');
    wx.login({
        success: function (res) {
            // console.log(res);
            fly.get("openid/", { code: res.code })
                .then(data => {
                    wx.setStorageSync("userID", { openid: data.openid, code: res.code })
                    // console.log("in Login:");
                    // console.log(data);
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
                language: res.userInfo.language,
                gender: res.userInfo.gender,
                country: res.userInfo.country,
                city: res.userInfo.city,
                province: res.userInfo.province
            });
        },
        fail: function (err) {
            console.log(err);
        }
    });
}
function GetData() {
    console.log('getting the canteen data.');
    wx.showLoading({
        title: '数据下载中...',
    })
    fly.get('canteen_list/')
        .then(res => {
            // console.log(res.data);
            wx.setStorageSync("dataBase", {
                data: res.data,
                downloadTime: new Date().getTime()
            });
            LoadData(res.data);
            wx.hideLoading();
            wx.showToast({
                title: '数据下载成功',
                icon: 'success',
                duration: 1500
            })
        }).catch(err => {
            console.log(err);
            wx.hideLoading();
            let dataBase = wx.getStorageSync("dataBase") || {};
            if(dataBase){
                LoadData(dataBase.data);
            }
            wx.showModal({
                title: '提示',
                content: '食堂数据下载失败（查看网络是否打开或者继续使用上次下载的数据）',
                showCancel: false, //不显示取消按钮
                confirmText: '确定'
            });
            
        });
}

export {
    Login,
    GetUserInfo,
    GetData
}