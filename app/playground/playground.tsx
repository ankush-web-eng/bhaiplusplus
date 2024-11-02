'use client';
import { CodeProvider } from '@/context/CodeContext';
import { CodeEditor } from '@/components/code/CodeEditor';
import { ResponsePanel } from '@/components/code/ResponsePanel';
import { SubmitButton } from '@/components/code/Submitbutton';
import { motion } from 'framer-motion';

export default function CodePlaygroundPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <CodeProvider>
      <motion.div
        className="min-h-screen bg-[#FDFDF9] dark:bg-[#060606] pt-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <motion.div variants={titleVariants}>
              <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Brolang Playground
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Write and execute your Brolang code below.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <CodeEditor />
                </motion.div>

              <motion.div
                className=""
                variants={itemVariants}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SubmitButton />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <ResponsePanel />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
        <div className='min-h-screen flex justify-center items-center'>test</div>
      </motion.div>
    </CodeProvider>
  );
}