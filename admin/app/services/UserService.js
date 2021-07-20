function UserService(){
    this.getAllUsers = function(){
        return axios({
            url: 'https://60f52fd32208920017f39f5a.mockapi.io/users',
            method: 'GET',
        });
    };

    this.addNewUser = function(user){
        return axios({
            url: "https://60f52fd32208920017f39f5a.mockapi.io/users",
            method: "POST",
            data: user
        });
    };

    this.getUserById = function(id){
        return axios({
            url:`https://60f52fd32208920017f39f5a.mockapi.io/users/${id}`,
            method: "GET",
        });
    };

    this.updateUser = function(user,id){
        return axios({
            url: `https://60f52fd32208920017f39f5a.mockapi.io/users/${id}`,
            method: "PUT",
            data: user
        })
    };

    this.deleteUser = function(id){
        return axios({
            url: `https://60f52fd32208920017f39f5a.mockapi.io/users/${id}`,
            method: "DELETE",
        })
    };

    this.checkAccountDuplicated = function(account, userArr){
        for(let i = 0 ; i < userArr.length; i++){
            if(userArr[i].taiKhoan.toLowerCase() == account.toLowerCase()){
                return true;
            } 
        }
        return false;
    }
}