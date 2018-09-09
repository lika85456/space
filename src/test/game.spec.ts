import {expect} from 'chai';
import * as Game from "../public/js/game/Game";
import {Loader} from "../public/js/connection/util";

describe("Game block side generating test", () => {
  it("should generate 2 to 3 ShipBlocks", () => {
    Loader.loadServerConfig().then(()=>{
      let block:Game.ShipBlock = new Game.ShipBlock(null,0,0);
      let blocks:Game.ShipBlock[] = block.generateSideBlocks(0);
      expect(blocks.length>0).to.be.true;
    });
  });
});

describe("Game block adding", () => {
  it("Should generate 3 ShipBlocks and add them to root block", () => {
    Loader.loadServerConfig().then(()=>{
      let block:Game.ShipBlock = new Game.ShipBlock(null,0,0);
      let blocks:Game.ShipBlock[] = block.generateSideBlocks(0);
      while(blocks.length>0)
      {
        blocks.forEach((element:Game.ShipBlock)=>{
          block.addChild(element);
        });
      }
      expect(block.children.length==3).to.be.true;
    });
  });
});

describe("Recursively adding 100 bocks", () => {
  it("root.getChildrenRecursive().length should be 100", () => {
    Loader.loadServerConfig().then(()=>{
      const rootBlock:Game.ShipBlock = new Game.ShipBlock(null,0,0);;
      let block:Game.ShipBlock = rootBlock;
      let blocks:Game.ShipBlock[] = block.generateSideBlocks(0);
      for(let i = 0;i<100;i++){
        if(blocks.length==0)
        {
          block = block.children[0];
        }
        block.addChild(blocks[0]);
        blocks.shift();
      }
      expect(rootBlock.getChildrenRecursive().length==100).to.be.true;
    });
  });
});
