angular.module('myApp.principal', [])
    .controller('principalCtrl',[function(){
        this.aboutText = 'This is the about component!';
        this.Mydata = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
        this.gridOptions = { 
            data : this.Mydata,
            enableRowSelection : true
        };
        
    }]);