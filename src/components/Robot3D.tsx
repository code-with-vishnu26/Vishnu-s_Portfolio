import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bot } from "lucide-react";
import * as THREE from "three";

const RobotModel = ({ isThinking = false }: { isThinking?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  
  // Left arm joints
  const leftShoulderRef = useRef<THREE.Group>(null);
  const leftElbowRef = useRef<THREE.Group>(null);
  
  // Right arm joints
  const rightShoulderRef = useRef<THREE.Group>(null);
  const rightElbowRef = useRef<THREE.Group>(null);

  // Leg joints for walking animation
  const leftLegRef = useRef<THREE.Group>(null);
  const leftKneeRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const rightKneeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Constant gentle bobbing/hovering animation ( Pixar-like weightless hover )
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2) * 0.08 - 0.2;
      
      if (isThinking) {
        // Energetic bounce and full spin on operational execution
        groupRef.current.position.y = Math.sin(t * 5) * 0.14 - 0.2;
        groupRef.current.rotation.y = t * 2.2;
      } else {
        // Slow gentle idle sweep to showcase high-gloss plastic/glass reflections
        groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
      }
    }

    // Walking animation cycle
    const walkSpeed = t * 4.5;
    if (leftLegRef.current && rightLegRef.current) {
      // Swing legs back and forth
      leftLegRef.current.rotation.x = Math.sin(walkSpeed) * 0.45;
      rightLegRef.current.rotation.x = Math.sin(walkSpeed + Math.PI) * 0.45;
      
      // Bend knees slightly when moving forward
      if (leftKneeRef.current && rightKneeRef.current) {
        leftKneeRef.current.rotation.x = Math.max(0, Math.sin(walkSpeed + Math.PI / 2)) * 0.5;
        rightKneeRef.current.rotation.x = Math.max(0, Math.sin(walkSpeed - Math.PI / 2)) * 0.5;
      }
    }

    // Friendly head tilt
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.5) * 0.03;
      headRef.current.rotation.x = Math.cos(t * 1.5) * 0.02;
    }

    // Dynamic dual-segment arm waving animations
    if (leftShoulderRef.current && rightShoulderRef.current) {
      if (isThinking) {
        leftShoulderRef.current.rotation.z = -Math.PI / 4 + Math.sin(t * 10) * 0.2;
        rightShoulderRef.current.rotation.z = Math.PI / 4 + Math.cos(t * 10) * 0.2;
        
        if (leftElbowRef.current && rightElbowRef.current) {
          leftElbowRef.current.rotation.z = -Math.PI / 6 + Math.sin(t * 10) * 0.3;
          rightElbowRef.current.rotation.z = Math.PI / 6 + Math.cos(t * 10) * 0.3;
        }
      } else {
        leftShoulderRef.current.rotation.z = Math.sin(t * 2) * 0.05;
        rightShoulderRef.current.rotation.z = -Math.sin(t * 2) * 0.05;
        
        if (leftElbowRef.current && rightElbowRef.current) {
          leftElbowRef.current.rotation.z = Math.sin(t * 2) * 0.03;
          rightElbowRef.current.rotation.z = -Math.sin(t * 2) * 0.03;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>

      {/* HEAD SECTION */}
      <group ref={headRef} position={[0, 0.58, 0]}>
        {/* Head Base (White Glossy Plastic) */}
        <mesh position={[0, -0.06, 0]}>
          <sphereGeometry args={[0.41, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.04} metalness={0.02} />
        </mesh>

        {/* Outer Large Transparent Glass Dome Head */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            roughness={0.03} 
            metalness={0.02} 
            transparent={true} 
            opacity={0.22} 
            transmission={0.92} 
            thickness={0.35} 
            ior={1.48}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
          />
        </mesh>

        {/* Location-pin Shaped Antenna centered on top of head */}
        <group position={[0, 0.44, 0]}>
          {/* Dark metallic stem connector (#37474F) */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.08, 16]} />
            <meshStandardMaterial color="#37474f" roughness={0.15} metalness={0.8} />
          </mesh>
          {/* Blue teardrop/pin base (inverted cone) */}
          <mesh position={[0, 0.1, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.045, 0.09, 16]} />
            <meshStandardMaterial color="#29b6f6" roughness={0.05} metalness={0.1} />
          </mesh>
          {/* Top pin sphere */}
          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial 
              color="#29b6f6" 
              emissive="#0ea5e9" 
              emissiveIntensity={0.6} 
              roughness={0.05} 
            />
          </mesh>
        </group>

        {/* Visor faceplate (Black glass screen) inside the dome */}
        <mesh position={[0, 0.04, 0.22]} scale={[1, 0.48, 0.22]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.08} metalness={0.15} />
        </mesh>

        {/* EXPRESSION SENSORY EYES (Cyan #00E5FF) */}
        {isThinking ? (
          /* CUTE EXPRESSION (Arching arches ^ ^) when thinking/loading */
          <>
            <mesh position={[-0.11, 0.04, 0.30]} rotation={[0, 0, -Math.PI]}>
              <torusGeometry args={[0.04, 0.012, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.5} />
            </mesh>
            <mesh position={[0.11, 0.04, 0.30]} rotation={[0, 0, -Math.PI]}>
              <torusGeometry args={[0.04, 0.012, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.5} />
            </mesh>
          </>
        ) : (
          /* HAPPY EXPRESSION (Circular Target LEDs) when idle */
          <>
            {/* Left Eye: Outer Ring & Inner Dot */}
            <mesh position={[-0.11, 0.04, 0.30]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.042, 0.01, 8, 24]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.0} />
            </mesh>
            <mesh position={[-0.11, 0.04, 0.308]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.005, 16]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.5} />
            </mesh>

            {/* Right Eye: Outer Ring & Inner Dot */}
            <mesh position={[0.11, 0.04, 0.30]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.042, 0.01, 8, 24]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.0} />
            </mesh>
            <mesh position={[0.11, 0.04, 0.308]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.005, 16]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.5} />
            </mesh>
          </>
        )}

        {/* Cute Smiling Mouth */}
        <mesh position={[0, -0.1, 0.28]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[0.05, 0.015, 0.015]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
      </group>

      {/* TORSO / BODY SECTION */}
      <group position={[0, 0, 0]}>
        {/* Rounded Glossy White Body (Egg capsule) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.46, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.04} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.23, 0]}>
          <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.04} metalness={0.02} />
        </mesh>
        <mesh position={[0, -0.23, 0]}>
          <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.04} metalness={0.02} />
        </mesh>

        {/* Accents: Blue Chest Stripe (#29b6f6) */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.355, 0.355, 0.1, 32]} />
          <meshStandardMaterial color="#29b6f6" roughness={0.05} />
        </mesh>

        {/* Tiny Red LED Indicator on right side of stripe (#FF3B30) */}
        <mesh position={[0.13, 0.06, 0.33]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={0.8} />
        </mesh>

        {/* Hip Joint connection block at bottom (#37474F) */}
        <mesh position={[0, -0.36, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
          <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.7} />
        </mesh>
      </group>

      {/* DUAL-SEGMENT ROBOTIC ARMS & METALLIC SILVER JOINTS */}
      {/* Left Arm */}
      <group ref={leftShoulderRef} position={[-0.4, 0.12, 0]}>
        {/* Shoulder joint (White ball) */}
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.04} />
        </mesh>
        {/* Upper Arm connection (Dark metal rod) */}
        <mesh position={[-0.03, -0.08, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 16]} />
          <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Elbow Joint (White ball) */}
        <group ref={leftElbowRef} position={[-0.03, -0.14, 0]}>
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.04} />
          </mesh>
          {/* Lower Arm (Dark metal rod) */}
          <mesh position={[-0.02, -0.08, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.12, 16]} />
            <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Hand Glove (White mitt with dark cuff) */}
          <group position={[-0.02, -0.15, 0]}>
            {/* Cuff */}
            <mesh position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
              <meshStandardMaterial color="#37474f" roughness={0.3} />
            </mesh>
            {/* Mitt */}
            <mesh>
              <sphereGeometry args={[0.065, 16, 16]} scale={[1, 1.2, 0.9]} />
              <meshStandardMaterial color="#ffffff" roughness={0.04} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Right Arm */}
      <group ref={rightShoulderRef} position={[0.4, 0.12, 0]}>
        {/* Shoulder joint (White ball) */}
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.04} />
        </mesh>
        {/* Upper Arm connection (Dark metal rod) */}
        <mesh position={[0.03, -0.08, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 16]} />
          <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Elbow Joint (White ball) */}
        <group ref={rightElbowRef} position={[0.03, -0.14, 0]}>
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.04} />
          </mesh>
          {/* Lower Arm (Dark metal rod) */}
          <mesh position={[0.02, -0.08, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.12, 16]} />
            <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Hand Glove (White mitt with dark cuff) */}
          <group position={[0.02, -0.15, 0]}>
            {/* Cuff */}
            <mesh position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
              <meshStandardMaterial color="#37474f" roughness={0.3} />
            </mesh>
            {/* Mitt */}
            <mesh>
              <sphereGeometry args={[0.065, 16, 16]} scale={[1, 1.2, 0.9]} />
              <meshStandardMaterial color="#ffffff" roughness={0.04} />
            </mesh>
          </group>
        </group>
      </group>

      {/* DUAL-SEGMENT LEGS & BELL-SHAPED FEET */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.14, -0.36, 0]}>
        {/* Upper Leg rod */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 16]} />
          <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Knee Joint (White ball) */}
        <group ref={leftKneeRef} position={[0, -0.12, 0]}>
          <mesh>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.04} />
          </mesh>
          {/* Lower Leg rod */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.12, 16]} />
            <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Shoe/Foot (White base with Blue sole) */}
          <group position={[0, -0.16, 0.02]}>
            {/* Shoe */}
            <mesh>
              <sphereGeometry args={[0.075, 16, 16]} scale={[1, 0.65, 1.25]} />
              <meshStandardMaterial color="#ffffff" roughness={0.04} />
            </mesh>
            {/* Blue sole base (#29b6f6) */}
            <mesh position={[0, -0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.077, 0.077, 0.02, 16]} />
              <meshStandardMaterial color="#29b6f6" roughness={0.2} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.14, -0.36, 0]}>
        {/* Upper Leg rod */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 16]} />
          <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Knee Joint (White ball) */}
        <group ref={rightKneeRef} position={[0, -0.12, 0]}>
          <mesh>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.04} />
          </mesh>
          {/* Lower Leg rod */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.12, 16]} />
            <meshStandardMaterial color="#37474f" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Shoe/Foot (White base with Blue sole) */}
          <group position={[0, -0.16, 0.02]}>
            {/* Shoe */}
            <mesh>
              <sphereGeometry args={[0.075, 16, 16]} scale={[1, 0.65, 1.25]} />
              <meshStandardMaterial color="#ffffff" roughness={0.04} />
            </mesh>
            {/* Blue sole base (#29b6f6) */}
            <mesh position={[0, -0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.077, 0.077, 0.02, 16]} />
              <meshStandardMaterial color="#29b6f6" roughness={0.2} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

interface Robot3DProps {
  className?: string;
  isThinking?: boolean;
}

export const Robot3D = ({ className = "", isThinking = false }: Robot3DProps) => {
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(supported);
    } catch (e) {
      setWebGlSupported(false);
    }
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative ${className} flex items-center justify-center bg-card/10 backdrop-blur rounded-2xl border border-white/5`}>
        <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary ${isThinking ? 'animate-bounce' : 'animate-pulse'}`}>
          <Bot className="w-6 h-6" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio Lighting matching design sheet */}
        <ambientLight intensity={0.65} color="#e6f7ff" />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#e6f7ff" />
        
        {/* Accent Point Lights */}
        <pointLight position={[3, 2, 2]} intensity={0.7} color="#00e5ff" />
        <pointLight position={[-3, -2, -2]} intensity={0.4} color="#29b6f6" />
        
        <RobotModel isThinking={isThinking} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
};

export default Robot3D;
