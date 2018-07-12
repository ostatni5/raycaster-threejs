function Laser(v1, v2, quantity, scale, wiggle) {
    var particles;
    var particleSystem;
    var stepV;
    var v1 = v1;
    var v2 = v2;
    var quantity = quantity;
    var scale = scale;
    var wiggle = wiggle;
    var particleMaterial = new THREE.PointsMaterial(
        {
            color: 0xff3300,
            size: 100, // ta wartośc zmieniamy suwakiem skali
            map: THREE.ImageUtils.loadTexture("img/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            opacity: 0.6
        });
 
    function _init() {
        if (arguments.length == 3)
        {
            v1 = arguments[0];
            v2 = arguments[1];
            quantity = arguments[2];
        }
        else
            quantity = arguments[0];

        stepV = subV(v1, v2).divideScalar(quantity);
        particles = new THREE.Geometry() // geometria - tablica cząsteczek
        particles.vertices0 = [];
        
        for (var i = 0; i < quantity; i++) {
            var particle = new THREE.Vector3(
                v1.x + stepV.x * i,
                v1.y + stepV.y * i,
                v1.z + stepV.z * i)
            var particle0 = new THREE.Vector3(
                v1.x + stepV.x * i,
                v1.y + stepV.y * i,
                v1.z + stepV.z * i)

            particles.vertices.push(particle);
            particles.vertices0.push(particle0);
        }

        particleSystem = new THREE.Points(particles, particleMaterial);
        particleSystem.name = "laser";
    }
    _init(v1,v2,quantity);

    function _update(_wiggle,_scale) {
        var verts = particles.vertices;
        var verts0 = particles.vertices0;
        wiggle = _wiggle;
        scale = _scale;
        for (var i = 0; i < verts.length; i++) {
            var particle = verts[i];
            var vert0 = verts0[i];
            // tu zmieniaj losowo pozycję x,y,z każdej z cząsteczek       
            particle.x = vert0.x + rand(-wiggle, wiggle)
            particle.y = vert0.y + rand(-wiggle, wiggle)
            particle.z = vert0.z + rand(-wiggle, wiggle)

        }

        particleSystem.geometry.verticesNeedUpdate = true;
        particleSystem.material.size = scale // zmiana skali wszystkich cząsteczek
    }

    this.init = function (val) {
        _init(val);
    }
    this.update = function (wiggle,scale) {
        _update(wiggle, scale);
    }
    this.getLaser = function () {
        return particleSystem;
    }
    this.getStep = function () {
        return stepV;
    }
    this.getStart = function () {
        return v1;
    }
    this.getEnd = function () {
        return v2;
    }
    this.getWiggle = function () {
        return wiggle;
    }
    this.getScale = function () {
        return scale;
    }
    this.getQuantity = function () {
        return quantity;
    }
}