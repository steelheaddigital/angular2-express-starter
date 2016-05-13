"use strict";
class UserService {
    constructor(db) {
        if (!db) {
            throw new Error('db is required');
        }
        this._db = db;
    }
    getUsers() {
        return this._db.getUsers().then(rows => {
            return rows;
        });
    }
}
exports.UserService = UserService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbWFpbi91c2VyL3VzZXJfc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFFRSxZQUFZLEVBQUU7UUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQztBQWZZLG1CQUFXLGNBZXZCLENBQUEiLCJmaWxlIjoiZG9tYWluL3VzZXIvdXNlcl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL0RhdGEvVXNlcnMvdG9tL1Byb2plY3RzL05laWdoYm9ybWFya2V0Ml9FeHByZXNzL3NlcnZlciJ9
