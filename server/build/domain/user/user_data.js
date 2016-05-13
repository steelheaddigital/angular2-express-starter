"use strict";
var db = require('../../db/database');
class UserData {
    getUsers() {
        return db.select().from('users');
    }
}
exports.UserData = UserData;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi91c2VyL3VzZXJfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFdEM7SUFDSSxRQUFRO1FBQ0osTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztBQUNMLENBQUM7QUFKWSxnQkFBUSxXQUlwQixDQUFBIiwiZmlsZSI6ImRvbWFpbi91c2VyL3VzZXJfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9EYXRhL1VzZXJzL3RvbS9Qcm9qZWN0cy9OZWlnaGJvcm1hcmtldDJfRXhwcmVzcy9zZXJ2ZXIifQ==
