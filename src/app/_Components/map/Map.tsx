import { FC } from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const Map: FC = () => {
  return (
    <div id="shop" >

    <div id="shop" className="pt-12 mt-14">
        <h1 className="text-black/75 text-3xl text-center pb-5 ">OUR SHOP</h1>
    <div  style={{ width: '100%', height: '550px', position: 'relative' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1745126.6728518275!2d73.18760145625!3d31.318928500000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a599833b0b457%3A0x9261c34937479b5e!2sHarman%20Auto%20Spares!5e0!3m2!1sen!2sin!4v1720476897194!5m2!1sen!2sin"
        style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        allowFullScreen
        loading="lazy"
        title="Google Map of Harman Auto Spares"
        ></iframe>
    </div>
        </div>
        </div>
  );
};

export default Map;
