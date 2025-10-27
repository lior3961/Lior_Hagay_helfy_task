import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, onToggle, onDelete, onEdit }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const CLONE_COUNT = 2;
  const TRANSITION_DURATION = 500;
  const AUTO_SCROLL_INTERVAL = 0; //possible autou scrolling between taks (currently off)

  const getExtendedTasks = () => {
    if (tasks.length === 0) return [];
    
    // If we have fewer tasks than clones, repeat the tasks
    if (tasks.length <= CLONE_COUNT) {
      // Create enough copies to fill the carousel
      const repeated = [];
      while (repeated.length < CLONE_COUNT * 3) {
        repeated.push(...tasks);
      }
      return repeated;
    }
    
    const startClones = tasks.slice(-CLONE_COUNT);
    const endClones = tasks.slice(0, CLONE_COUNT);
    
    return [...startClones, ...tasks, ...endClones];
  };

  const extendedTasks = getExtendedTasks();
  
  const goToNext = () => {
    if (isTransitioning || tasks.length === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex + 1);
  };


  const goToPrevious = () => {
    if (isTransitioning || tasks.length === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  
  useEffect(() => {
    if (tasks.length === 0) return;
    
    const timer = setTimeout(() => {
      if (currentIndex >= tasks.length + CLONE_COUNT) {
        setCurrentIndex(CLONE_COUNT);
        setIsTransitioning(false);
      }
      else if (currentIndex < CLONE_COUNT) {
        setCurrentIndex(tasks.length + CLONE_COUNT - 1);
        setIsTransitioning(false);
      }
      else {
        setIsTransitioning(false);
      }
    }, TRANSITION_DURATION);
    
    return () => clearTimeout(timer);
  }, [currentIndex, tasks.length]);


  
  useEffect(() => {
    if (AUTO_SCROLL_INTERVAL > 0 && tasks.length > 0) {
      autoScrollInterval.current = setInterval(() => {
        goToNext();
      }, AUTO_SCROLL_INTERVAL);
      
      return () => {
        if (autoScrollInterval.current) {
          clearInterval(autoScrollInterval.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length, currentIndex]);


  
  useEffect(() => {
    if (tasks.length > 0) {
      setCurrentIndex(CLONE_COUNT);
    }
  }, [tasks.length]);


  
  const getTransformStyle = () => {
    const offset = currentIndex * 100;
    
    return {
      transform: `translateX(-${offset}%)`,
      transition: isTransitioning ? `transform ${TRANSITION_DURATION}ms ease-in-out` : 'none'
    };
  };


  
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    );
  }


  
  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      
      <div className="carousel-wrapper">
        {/* Previous Button */}
        <button
          className="carousel-button prev"
          onClick={goToPrevious}
          disabled={isTransitioning}
          aria-label="Previous task"
        >
          &#8249;
        </button>

        {/* Carousel Container */}
        <div className="carousel-container" ref={carouselRef}>
          <div className="carousel-track" style={getTransformStyle()}>
            {extendedTasks.map((task, index) => (
              <div key={`${task.id}-${index}`} className="carousel-slide">
                <TaskItem
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className="carousel-button next"
          onClick={goToNext}
          disabled={isTransitioning}
          aria-label="Next task"
        >
          &#8250;
        </button>
      </div>

      {/* Carousel Indicators (Dots) */}
      <div className="carousel-indicators">
        {tasks.map((task, index) => (
          <button
            key={task.id}
            className={`indicator ${
              (currentIndex - CLONE_COUNT) % tasks.length === index ? 'active' : ''
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index + CLONE_COUNT);
              }
            }}
            aria-label={`Go to task ${index + 1}`}
          />
        ))}
      </div>

      {/* Task Counter */}
      <div className="task-counter">
        Task {((currentIndex - CLONE_COUNT) % tasks.length) + 1} of {tasks.length}
      </div>
    </div>
  );
}

export default TaskList;

