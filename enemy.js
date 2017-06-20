         

        var enemies = new Array();
        var bulletEnemy = new Array();
        var player_enemy = true;
        var directionBullet;        
        var shootBullet = false;
        var statusEnemies = true;
        var eneX, eneY, eneV,bneX, bneY;
        var bulletSpeed = 5;



               eneX = 220; 
               eneY = 300;
               eneV = 2.5;
               //to create an array containg instances of the enemy and enemy bullet objects, depending on the level there will be one, two and three enemies respectively

               for(j = 0;j<3;j++){
                enemies[j] = new enemy(eneX,eneY,35,35,eneV,0,true);
                bulletEnemy[j] = new enemyBullet(eneX+12,eneY+12,15,4,eneV,0,true);
                eneX+= 130;
                eneY+= 205;
               }
          

            function enemy(x,y,width,height,velocityX,velocityY,status){
                  this.x = x;
                  this.y = y;
                  this.width = width;
                  this.height = height;
                  this.velocityX = velocityX;
                  this.velocityY = velocityY;
                  this.status = true;


                 }

            enemy.prototype.draw = function(ox,oy,k,statusEnemies){
                   
                   if(statusEnemies){
                   ctx.fillStyle = "34e00f";
                   ctx.drawImage(player_Pic,this.x+ox,this.y+oy,this.width,this.height);
                   //ctx.drawImage(imageEnemy,widthEnemy*currentFrameEnemy, heightEnemy*directionEnemy ,widthEnemy,heightEnemy,enemies[k].x+ox,enemies[k].y+oy ,enemies[k].width,enemies[k].height);
                  }
                 
                };

            enemy.prototype.move = function(ox,oy,k,statusEnemies){
                  if(this.x+this.velocityX>335){
                     this.velocityX = -2.5;
                      if(enemies[k].x==bulletEnemy[k].x){
                      bulletEnemy[k].velocityX = eneV;
                       }
                     directionEnemy = 2;

                    }
                    else if(this.x+this.velocityX<100){
                     this.velocityX = 2.5;
                     if(this.x==bulletEnemy[k].x){
                        bulletEnemy[k].velocityX = -eneV;
                      }
                     directionEnemy = 3;
                    }

                    this.x += this.velocityX;
              
                   this.draw(ox,oy,k,statusEnemies);
                };



            function enemyBullet(x,y,width,height,velocityX,status){
                  this.x = x;
                  this.y = y;
                  this.width = width;
                  this.height = height;
                  this.velocityX = velocityX;
                  this.status = true;
               
                }
            enemyBullet.prototype.drawB = function(bx,by,statusBullet){

                  if(statusBullet){
                  ctx.fillStyle = "#727170";
                  ctx.fillRect(this.x+bx,this.y+by,this.width,this.height);
                  ctx.fill();
                  }
                    
                };

            enemyBullet.prototype.moveB = function(bx,by,statusBullet){
                   if(this.x-this.velocityX<35){
                     this.x = enemies[i].x;
                     player_status = true;
                  }

                   this.x -= this.velocityX;
                   this.drawB(bx,by,statusBullet);
                  

                };

                

            function colliosionBullet(x1,y1,w1,h1,x2,y2,w2,h2,k){//for checking colliosion between the player and the enemy's bullet
                 
                  if((x1<x2+w2)&&(x1+w1>x2)&&(y1<y2+h2)&&(y1+h1>y2)&&player_status&&bulletEnemy[k].status){
                    energyLevel -= Math.round(100/3);
                    player.delay += 50;
                    player_status = false;
                    
                   }
          
                 }

            function colliosionEnemy(x1,y1,w1,h1,x2,y2,w2,h2,k){//to check for colliosion between the enemy and the player
                 
                  if((x1<x2+w2)&&(x1+w1>x2)&&(y1<y2+h2)&&(y1+h1>y2)&&player_enemy&&enemies[k].status){
                    energyLevel -= Math.round(100/6);
                    player.delay += 50;
                    player_enemy = false;
    
                    
                   }
          
                 }

            function colliosionPlayer(x1,y1,w1,h1,x2,y2,w2,h2,k){//to check if the player's bullet has shot the enemy
                 
                  if((x1<x2+w2)&&(x1+w1>x2)&&(y1<y2+h2)&&(y1+h1>y2)&&player_enemy){
                    energyLevel += Math.round(100/6);
                    enemies[k].status = false;//once the enemy has been shot the status of the enemy and the bullet is set to false so as to not draw the bullet in the further level
                    bulletEnemy[k].status = false;
                    if(enemyShotStatus){
                      enemyShotSound.play();
                    }                 
                  }
          
                 }



            function playerEnergy(){//to check if the player's energy has reached 0 yet
                if(energyLevel<0){

                    clearInterval(game[i]);

                     i = 0;                      //to reset the game once the player energy reaches 0
                    levelStatus = 0;
                    updateLevel();

                  }
                }

            function gameOver(){
               scoreFinal = coinCollected*50 + energyLevel* 70;//to calculate the score when the game is over
               alert("You have scored " + scoreFinal + " points");

           }     

                  
                 