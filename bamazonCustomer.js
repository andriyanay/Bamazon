var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"password",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
//	console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;

		for(var i = 0; i < res.length; i++) {
			console.log(res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
		}
		buyItem();
	});
}

function buyItem(){
	inquirer.prompt([
	{
		name: "id",
		type: "input",
		message:"Please enter the ID of the item that you would like to purchase:",
		filter:Number
	},
	{
		name:"quantity",
		type:"input",
		message:"Please enter the amount of items that you would like to purchase:",
		filter:Number
	},

 ]).then(function(answers){
	 var idNeeded = answers.id;
	 var quantityNeeded = answers.quantity;
 	purchaseOrder(idNeeded, quantityNeeded);
 });
};

function purchaseOrder(ID, amount){
	connection.query("Select * FROM products WHERE item_id = " + ID, function(err,res){
		if(err){console.log(err)};
		if(amount <= res[0].stock_quantity){
            var totalCost = res[0].price * amount;
            var updatedQuantity = res[0].stock_quantity - amount;
			console.log("Processing your request...");
			console.log("The total cost for " + amount + " " +res[0].product_name + " is " + totalCost + ". Thank you!");

			connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: updatedQuantity
                  },
                  {
                    item_id: ID
                  }
                ],                
                );
		} else{
			console.log("Insuficcient quantity. There's not enough " + res[0].product_name + " in stock to process your order.");
		};
		displayProducts();
	});
};

