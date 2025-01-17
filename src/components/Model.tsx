import * as THREE from "three";import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh;
    Object_8: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    MatI_Ride_FengHuang_01a: THREE.MeshStandardMaterial;
    MatI_Ride_FengHuang_01b: THREE.MeshStandardMaterial;
  };
};

const ActionName = "Take 001";

export const Model = forwardRef((props: JSX.IntrinsicElements["group"], ref) => { 
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/phoenix_bird.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  useImperativeHandle(ref, () => ({
    flyAnimation,
  }));

  const flyAnimation = () => {
    if (group.current) {
      const timeline = gsap.timeline();

      timeline.fromTo(
        group.current.position,
        { x: 0, z: 0, delay: 3 }, // Start off-screen to the right
        { x: -3000, z: -1000, duration: 1, ease: "power3.out" } // Move to the center
      );
      timeline.fromTo(
        group.current.position,
        { x: -3000, z: -1000, delay: 3 }, // Start off-screen to the right
        { x: 3000, z: 1000, duration: 1, ease: "power3.out" } // Move to the center
      );
      timeline.fromTo(
        group.current.position,
        { x: 3000, z: 0 }, // Start off-screen to the right
        { x: 0, duration: 5, ease: "power3.out" } // Move to the center
      );
    }
  };

  useEffect(() => {
    actions[ActionName]?.play();
    return () => {
      actions[ActionName]?.stop();
    };
  }, [actions]);

  useEffect(() => {
    if (
      materials.MatI_Ride_FengHuang_01a &&
      materials.MatI_Ride_FengHuang_01b
    ) {
      materials.MatI_Ride_FengHuang_01a.emissive = new THREE.Color(0xffa500); // Orange glow
      materials.MatI_Ride_FengHuang_01a.emissiveIntensity = 2.0;

      materials.MatI_Ride_FengHuang_01b.emissive = new THREE.Color(0xff4500); // Reddish glow
      materials.MatI_Ride_FengHuang_01b.emissiveIntensity = 2.0;
    }
  }, [materials]);

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group
            name="Sketchfab_model"
            position={[0, 0, 0]}
            rotation={[20, 0, 0]}
          >
            <group
              name="5f59736c86d4457fa045aec4aea6b7e0fbx"
              rotation={[Math.PI / 2, 0, 0]}
            >
              <group name="Object_2">
                <group name="RootNode">
                  <group name="Object_4">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_7"
                      geometry={nodes.Object_7.geometry}
                      material={materials.MatI_Ride_FengHuang_01a}
                      skeleton={nodes.Object_7.skeleton}
                    />
                    <skinnedMesh
                      name="Object_8"
                      geometry={nodes.Object_8.geometry}
                      material={materials.MatI_Ride_FengHuang_01b}
                      skeleton={nodes.Object_8.skeleton}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5} // Adjust glow intensity
          luminanceThreshold={0.2} // Glow threshold
          luminanceSmoothing={0.5} // Smooth edges of the glow
        />
      </EffectComposer>
    </>
  );
})
