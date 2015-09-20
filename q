[1mdiff --git a/controllers/foods.js b/controllers/foods.js[m
[1mindex cf8eede..14489d2 100644[m
[1m--- a/controllers/foods.js[m
[1m+++ b/controllers/foods.js[m
[36m@@ -31,7 +31,7 @@[m [mexports.getFoods = (function(req, res){[m
         if(err){[m
             res.send(err);[m
         }[m
[31m-        res.json(foods);[m
[32m+[m[32m        res.json({ result: foods} );[m
     });[m
 });[m
 [m
[36m@@ -124,17 +124,15 @@[m [mexports.searchFood = (function(req, res){[m
             }[m
         }[m
         console.log('Total',listcon.length,'object');[m
[31m-        console.log('Find duplicate object',arr);[m
[31m-        console.log('Highest value is',maxValue);[m
[31m-        console.log('Total highest value is',newarr.length);[m
[32m+[m[32m        console.log('Find duplicate object', arr);[m
[32m+[m[32m        console.log('Highest value is', maxValue);[m
[32m+[m[32m        console.log('Total highest value is', newarr.length);[m
         console.log(newarr);[m
[31m-        res.json(newarr);[m
[32m+[m[32m        res.json({ result : newarr });[m
 [m
     });[m
 [m
 [m
[31m-    //list[2][0]['__v'] = 10;[m
[31m-[m
 });[m
 [m
 function findIndex(arraytosearch, key, valuetosearch) {[m
[1mdiff --git a/server.js b/server.js[m
[1mindex d531b00..e77a6f4 100644[m
[1m--- a/server.js[m
[1m+++ b/server.js[m
[36m@@ -50,7 +50,7 @@[m [mrouter.get('/', function(req, res) {[m
 [m
 router.route('/api/foods')[m
     .post(authController.isAuthenticated, foodController.postFoods)[m
[31m-    .get(authController.isAuthenticated, foodController.getFoods);[m
[32m+[m[32m    .get(foodController.getFoods);[m
 [m
 router.route('/api/foods/:food_id')[m
     .get(authController.isAuthenticated, foodController.getFood)[m
