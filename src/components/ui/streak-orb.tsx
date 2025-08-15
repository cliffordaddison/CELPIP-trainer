"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D, Center, Float } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useSpring, animated } from "@react-spring/three";

interface StreakOrbProps {
  streak: number;
  className?: string;
}

export default function StreakOrb({ streak, className = "" }: StreakOrbProps) {
  const { scale } = useSpring({
    scale: streak > 0 ? 1 : 0.8,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <motion.div
      className={`h-48 w-48 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Float
          speed={1.5}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Center>
            <animated.mesh scale={scale}>
              <Text3D
                font="/fonts/bold.json"
                size={1.2}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
              >
                {streak}
                <meshStandardMaterial
                  color={streak >= 10 ? "#10b981" : streak >= 7 ? "#3b82f6" : streak >= 4 ? "#f59e0b" : "#ef4444"}
                  metalness={0.8}
                  roughness={0.2}
                />
              </Text3D>
            </animated.mesh>
          </Center>
        </Float>
        
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </motion.div>
  );
}
