"use strict";
require('mocha');
const chai_1 = require('chai');
const user_service_1 = require('../../domain/user/user_service');
describe('User Service', function () {
    var mockDb = {
        getUsers: function () {
            var promise = new Promise(function (resolve, reject) {
                resolve({ id: 1, name: 'Test' });
            });
            return promise;
        }
    };
    var userService = new user_service_1.UserService(mockDb);
    it('getUsers() returns correct result', function (done) {
        userService.getUsers().then(function (result) {
            chai_1.expect(result.id).to.equal(1);
            chai_1.expect(result.name).to.equal('Test');
            done();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc2VydmljZXMvdXNlcl9zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sT0FDUCxDQUFDLENBRGE7QUFDZCx1QkFBdUIsTUFDdkIsQ0FBQyxDQUQ0QjtBQUM3QiwrQkFBNEIsZ0NBRTVCLENBQUMsQ0FGMkQ7QUFFNUQsUUFBUSxDQUFDLGNBQWMsRUFBRTtJQUV2QixJQUFJLE1BQU0sR0FBRztRQUNYLFFBQVEsRUFBRTtZQUNSLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ2hELE9BQU8sQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFDLENBQUE7WUFFRixNQUFNLENBQUMsT0FBTyxDQUFBO1FBQ2hCLENBQUM7S0FDRixDQUFBO0lBQ0QsSUFBSSxXQUFXLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFDLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxVQUFTLElBQUk7UUFDbkQsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLE1BQU07WUFDekMsYUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLGFBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3NlcnZpY2VzL3VzZXJfc2VydmljZS5zcGVjLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL0RhdGEvVXNlcnMvdG9tL1Byb2plY3RzL05laWdoYm9ybWFya2V0Ml9FeHByZXNzL3NlcnZlciJ9
