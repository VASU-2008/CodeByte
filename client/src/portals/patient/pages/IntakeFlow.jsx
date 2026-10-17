import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitIntake } from '../../../api/patientApi';
import {
  Mic, MicOff, StopCircle, CheckCircle2, AlertTriangle,
  ChevronRight, ChevronLeft, Loader2, Phone, Building2,
  Info, ArrowRight, Volume2, Sparkles, RotateCcw, Globe, HelpCircle,
  QrCode, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const t = (lang, en, hi) => lang === 'hi' ? hi : en;

/* ── i18n strings ─────────────────────────────────────────── */
const I18N = {
  step1Title:       ['Describe your symptoms',               'अपने लक्षण बताएं'],
  step1Sub:         ["Tell us what you're experiencing or speak using voice input", 'आप क्या महसूस कर रहे हैं बताएं या आवाज से बोलकर इनपुट करें'],
  step2Title:       ['Symptom Duration & Severity',          'लक्षण की अवधि और गंभीरता'],
  step2Sub:         ['How long and how severe?',             'कितने समय से और कितना गंभीर है?'],
  step3Title:       ['Review & Submit',                      'समीक्षा और जमा करें'],
  resultTitle:      ['Your Recommended Facility',            'आपका अनुशंसित स्वास्थ्य केंद्र'],
  complaintLabel:   ['Chief Complaint',                      'मुख्य शिकायत'],
  complaintPh:      ['Describe your symptoms in detail (or click the microphone below to speak)…', 'अपने लक्षणों का विस्तार से वर्णन करें (या बोलने के लिए नीचे माइक दबाएं)…'],
  durationLabel:    ['How long have you had these symptoms?','यह लक्षण कितने समय से हैं?'],
  severityLabel:    ['Severity (1 = mild, 10 = very severe)','गंभीरता (1 = हल्का, 10 = बहुत गंभीर)'],
  notesLabel:       ['Additional notes (optional)',           'अतिरिक्त नोट्स (वैकल्पिक)'],
  notesPh:          ['Existing conditions, allergies, current medications, etc.', 'पुरानी बीमारियां, एलर्जी, चल रही दवाइयां, आदि'],
  btnContinue:      ['Continue',                             'जारी रखें'],
  btnBack:          ['Back',                                 'वापस'],
  btnSubmit:        ['Submit & Get Routing',                 'जमा करें'],
  btnVoiceStart:    ['Start voice input',                    'आवाज से बोलना शुरू करें'],
  btnVoiceStop:     ['Stop recording',                       'रिकॉर्डिंग बंद करें'],
  voiceListening:   ['Listening… Speak now',                 'सुन रहा हूँ… अब बोलें'],
  voiceLangLabel:   ['Voice Language:',                      'आवाज भाषा:'],
  voiceLangHindi:   ['हिन्दी (Hindi)',                       'हिन्दी (Hindi)'],
  voiceLangEng:     ['English (India)',                      'English (India)'],
  voiceUnsupported: ['Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari, or type your symptoms below.',
                     'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया Chrome, Edge, या Safari का उपयोग करें, या नीचे लक्षण टाइप करें।'],
  voiceDenied:      ['Microphone permission was denied. Please click the camera/lock icon in your browser address bar to allow microphone access.',
                     'माइक्रोफ़ोन एक्सेस अस्वीकार किया गया। कृपया ब्राउज़र एड्रेस बार में लॉक/कैमरा आइकन पर क्लिक करके अनुमति दें।'],
  voiceNetwork:     ['Speech service connection error. Please ensure your internet is active or type your symptoms.',
                     'स्पीच सेवा नेटवर्क त्रुटि। कृपया इंटरनेट कनेक्शन जांचें या मैन्युअल टाइप करें।'],
  voiceMicMissing:  ['No microphone was detected on this device. Please check your mic connection.',
                     'इस डिवाइस पर कोई माइक्रोफ़ोन नहीं मिला। कृपया अपना माइक जांचें।'],
  voiceError:       ['Voice input encountered an error. Please try again or type your symptoms.',
                     'वॉइस इनपुट में त्रुटि आई। कृपया पुनः प्रयास करें या लक्षण टाइप करें।'],
  voiceSpeakingHint:['Microphone is active. Speak clearly into your mic…',
                     'माइक्रोफ़ोन सक्रिय है। कृपया माइक में स्पष्ट रूप से बोलें…'],
  voiceInterimLabel:['Transcribing live:',                   'सीधा ट्रांसक्रिप्शन:'],
  quickSymptoms:    ['Common Symptoms (click to add):',      'सामान्य लक्षण (जोड़ने के लिए क्लिक करें):'],
  clearText:        ['Clear text',                           'टेक्स्ट साफ़ करें'],
  charCountMin:     ['(Minimum 10 characters required)',     '(कम से कम 10 अक्षर आवश्यक)'],
  emergencyTitle:   ['⚠️ Possible Emergency Detected',       '⚠️ संभावित आपातकाल का पता लगाया गया'],
  emergencyMsg:     ['Your symptoms may indicate a medical emergency. Please call emergency services immediately. Do not wait for a portal appointment.',
                     'आपके लक्षण चिकित्सा आपातकाल का संकेत दे सकते हैं। कृपया तुरंत आपातकालीन सेवाओं को कॉल करें। पोर्टल अपॉइंटमेंट का इंतजार न करें।'],
  emergencyCall:    ['Call 112 (India Emergency)',           '112 कॉल करें (भारत आपातकाल)'],
  demoNotice:       ['Demo mode: routing is rule-based. Results will use real AI once the backend is connected.',
                     'डेमो मोड: रूटिंग नियम-आधारित है। बैकएंड कनेक्ट होने पर वास्तविक AI परिणाम मिलेंगे।'],
  reqComplaint:     ['Please enter at least 10 characters describing your symptoms', 'कृपया अपने लक्षणों का कम से कम 10 अक्षरों में वर्णन करें'],
  reqDuration:      ['Please select duration',              'कृपया अवधि चुनें'],
};

const str = (lang, key) => I18N[key]?.[lang === 'hi' ? 1 : 0] ?? key;

const DURATIONS = [
  { value: 'today',   label: 'Today',      labelHi: 'आज' },
  { value: '2-3days', label: '2-3 days',   labelHi: '2-3 दिन' },
  { value: '1week',   label: 'About a week',labelHi: 'लगभग एक सप्ताह' },
  { value: '2weeks',  label: '2+ weeks',   labelHi: '2+ सप्ताह' },
  { value: '1month',  label: '1+ month',   labelHi: '1+ महीना' },
];

const COMMON_SYMPTOMS = [
  { en: 'High fever and body ache for 3 days', hi: '3 दिन से तेज बुखार और बदन दर्द' },
  { en: 'Persistent dry cough and sore throat', hi: 'लगातार सूखी खांसी और गले में खराश' },
  { en: 'Severe stomach ache with nausea and vomiting', hi: 'पेट में तेज दर्द, जी मिचलाना और उल्टी' },
  { en: 'Throbbing headache and dizziness', hi: 'सिर में तेज दर्द और चक्कर आना' },
  { en: 'Difficulty breathing and chest tightness', hi: 'सांस लेने में तकलीफ और सीने में भारीपन' },
  { en: 'Joint pain, weakness and mild fever', hi: 'जोड़ों में दर्द, कमजोरी और हल्का बुखार' },
];

const DEST_CONFIG = {
  PHC:       { color: '#10b981', bg: '#d1fae5', label: 'Primary Health Centre', labelHi: 'प्राथमिक स्वास्थ्य केंद्र', advice: 'Visit the PHC nearest to you.', adviceHi: 'अपने नजदीकी PHC पर जाएं।' },
  CHC:       { color: '#f59e0b', bg: '#fef3c7', label: 'Community Health Centre', labelHi: 'सामुदायिक स्वास्थ्य केंद्र', advice: 'Visit a CHC for further evaluation.', adviceHi: 'आगे की जांच के लिए CHC पर जाएं।' },
  OPD:       { color: '#3b82f6', bg: '#eff6ff', label: 'Outpatient Department', labelHi: 'बाह्य रोगी विभाग', advice: 'Book an OPD appointment.', adviceHi: 'OPD अपॉइंटमेंट बुक करें।' },
  EMERGENCY: { color: '#dc2626', bg: '#fef2f2', label: 'Emergency Services', labelHi: 'आपातकाल सेवाएं', advice: 'Call 112 immediately!', adviceHi: 'तुरंत 112 कॉल करें!' },
};

/* ── Robust Voice Recognition Hook ────────────────────────── */
function useSpeechRecognition({ voiceLang, onFinalPhrase, onInterimChange, onError }) {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const isListeningRef = useRef(false);
  const manualStopRef = useRef(false);
  const restartTimerRef = useRef(null);

  const supported = typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const stop = useCallback(() => {
    manualStopRef.current = true;
    isListeningRef.current = false;
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    onInterimChange('');
  }, [onInterimChange]);

  const start = useCallback(() => {
    if (!supported) {
      onError('unsupported');
      return;
    }

    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    manualStopRef.current = false;
    isListeningRef.current = true;

    try {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = voiceLang; // 'hi-IN' or 'en-IN'
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (e) => {
        let interim = '';
        let newlyFinalized = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          const text = res[0]?.transcript || '';
          if (res.isFinal) {
            newlyFinalized += (newlyFinalized ? ' ' : '') + text.trim();
          } else {
            interim += text;
          }
        }
        if (newlyFinalized) {
          onFinalPhrase(newlyFinalized);
        }
        onInterimChange(interim);
      };

      rec.onerror = (e) => {
        // Ignore benign events that should NOT stop recognition:
        if (e.error === 'no-speech') {
          // Normal pause in speech — do not alert or abort
          return;
        }
        if (e.error === 'aborted') {
          // Normal if manual stop or restarting
          return;
        }

        if (e.error === 'not-allowed' || e.error === 'permission-denied') {
          manualStopRef.current = true;
          isListeningRef.current = false;
          setIsListening(false);
          onError('denied');
          return;
        }
        if (e.error === 'network') {
          manualStopRef.current = true;
          isListeningRef.current = false;
          setIsListening(false);
          onError('network');
          return;
        }
        if (e.error === 'audio-capture') {
          manualStopRef.current = true;
          isListeningRef.current = false;
          setIsListening(false);
          onError('audio-capture');
          return;
        }

        // Other generic errors
        manualStopRef.current = true;
        isListeningRef.current = false;
        setIsListening(false);
        onError('error');
      };

      rec.onend = () => {
        // In Chrome, continuous recognition often fires onend after brief pauses.
        // If user did not manually click Stop, auto-restart seamlessly.
        if (isListeningRef.current && !manualStopRef.current) {
          restartTimerRef.current = setTimeout(() => {
            if (isListeningRef.current && !manualStopRef.current) {
              try {
                rec.start();
              } catch {
                // If reuse fails, create fresh
                start();
              }
            }
          }, 200);
        } else {
          setIsListening(false);
          onInterimChange('');
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.error('Speech recognition startup error:', err);
      setIsListening(false);
      onError('error');
    }
  }, [supported, voiceLang, onFinalPhrase, onInterimChange, onError]);

  useEffect(() => {
    return () => {
      manualStopRef.current = true;
      isListeningRef.current = false;
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  return { supported, isListening, start, stop };
}

/* ── Web Audio API Microphone Level Visualizer ──────────────── */
function useAudioVisualizer({ isListening, onError }) {
  const [audioLevel, setAudioLevel] = useState(0); // 0 to 100
  const [hasSound, setHasSound] = useState(false);
  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!isListening) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setAudioLevel(0);
      setHasSound(false);
      return;
    }

    let active = true;
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          if (!active) {
            stream.getTracks().forEach(t => t.stop());
            return;
          }
          streamRef.current = stream;
          try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            audioCtxRef.current = ctx;
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            analyser.smoothingTimeConstant = 0.4;
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            let speechCount = 0;

            const updateMeter = () => {
              if (!active) return;
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
              const avg = sum / dataArray.length;
              const lvl = Math.min(100, Math.round((avg / 65) * 100));
              setAudioLevel(lvl);

              if (lvl > 10) {
                speechCount++;
                if (speechCount >= 3) setHasSound(true);
              }
              animFrameRef.current = requestAnimationFrame(updateMeter);
            };
            updateMeter();
          } catch (e) {
            console.warn('Audio visualization unavailable:', e);
          }
        })
        .catch(err => {
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            onError('denied');
          } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            onError('audio-capture');
          }
        });
    }

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isListening, onError]);

  return { audioLevel, hasSound };
}

/* ── VoiceInput Component ─────────────────────────────────── */
function VoiceInput({ lang, onAppendText, currentText, onClearText }) {
  // Allow user to select voice recognition language independently or sync with portal lang
  const [voiceLang, setVoiceLang] = useState(lang === 'hi' ? 'hi-IN' : 'en-IN');
  const [voiceError, setVoiceError] = useState(null);
  const [interimText, setInterimText] = useState('');
  const [durationSecs, setDurationSecs] = useState(0);

  // Sync default voiceLang when portal lang prop changes
  useEffect(() => {
    setVoiceLang(lang === 'hi' ? 'hi-IN' : 'en-IN');
  }, [lang]);

  const handleFinalPhrase = useCallback((phrase) => {
    onAppendText(phrase);
    setInterimText('');
  }, [onAppendText]);

  const handleError = useCallback((type) => {
    setVoiceError(type);
  }, []);

  const { supported, isListening, start, stop } = useSpeechRecognition({
    voiceLang,
    onFinalPhrase: handleFinalPhrase,
    onInterimChange: setInterimText,
    onError: handleError
  });

  const { audioLevel, hasSound } = useAudioVisualizer({
    isListening,
    onError: handleError
  });

  // Track recording duration
  useEffect(() => {
    let timer = null;
    if (isListening) {
      setDurationSecs(0);
      timer = setInterval(() => setDurationSecs(s => s + 1), 1000);
    } else {
      setDurationSecs(0);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isListening]);

  function toggleVoice() {
    setVoiceError(null);
    if (isListening) {
      stop();
    } else {
      start();
    }
  }

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="voice-input-container" style={{
      background: isListening ? '#fef2f2' : 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
      border: isListening ? '1.5px solid #f87171' : '1px solid var(--pp-border)',
      borderRadius: 'var(--radius-xl)',
      padding: '0.875rem 1rem',
      transition: 'all 0.3s ease'
    }}>
      {/* Top Bar: Controls, Lang Toggle, Timer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={toggleVoice}
            disabled={!supported}
            className={`pp-btn ${isListening ? 'pp-btn-danger' : 'pp-btn-primary'} pp-btn-sm`}
            title={supported ? str(lang, isListening ? 'btnVoiceStop' : 'btnVoiceStart') : str(lang, 'voiceUnsupported')}
            aria-label={str(lang, isListening ? 'btnVoiceStop' : 'btnVoiceStart')}
            style={{ minWidth: 150, gap: '0.5rem', fontWeight: 600 }}
          >
            {isListening
              ? <><StopCircle size={16} /> {str(lang, 'btnVoiceStop')}</>
              : <><Mic size={16} /> {str(lang, 'btnVoiceStart')}</>
            }
          </button>

          {/* Active Recording Indicator & Live Wave Bars */}
          {isListening && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="voice-pulse-badge">
                <span className="voice-pulse-dot" />
                {formatTimer(durationSecs)}
              </span>

              {/* Dynamic Equalizer Bars */}
              <div className="audio-wave-bars" title="Microphone volume">
                {[0.4, 0.8, 1.2, 0.9, 0.6].map((mult, idx) => {
                  const barHeight = Math.max(4, Math.min(22, (audioLevel * mult * 0.28)));
                  return (
                    <span
                      key={idx}
                      className="wave-bar"
                      style={{
                        height: `${barHeight}px`,
                        background: audioLevel > 15 ? 'var(--pp-danger)' : '#cbd5e1'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Voice Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Globe size={13} />
            {str(lang, 'voiceLangLabel')}
          </span>
          <div style={{ display: 'inline-flex', background: '#e2e8f0', borderRadius: 'var(--radius-full)', padding: 2 }}>
            <button
              type="button"
              onClick={() => {
                setVoiceLang('hi-IN');
                if (isListening) {
                  stop();
                  toast(t(lang, 'Switched to Hindi. Click mic to speak.', 'हिन्दी पर स्विच किया गया। बोलने के लिए माइक दबाएं।'), { icon: '🎙️' });
                }
              }}
              style={{
                border: 'none',
                background: voiceLang === 'hi-IN' ? 'var(--pp-primary)' : 'transparent',
                color: voiceLang === 'hi-IN' ? '#ffffff' : 'var(--pp-text-secondary)',
                borderRadius: 'var(--radius-full)',
                padding: '0.2rem 0.6rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🇮🇳 हिन्दी
            </button>
            <button
              type="button"
              onClick={() => {
                setVoiceLang('en-IN');
                if (isListening) {
                  stop();
                  toast(t(lang, 'Switched to English. Click mic to speak.', 'अंग्रेजी पर स्विच किया गया। बोलने के लिए माइक दबाएं।'), { icon: '🎙️' });
                }
              }}
              style={{
                border: 'none',
                background: voiceLang === 'en-IN' ? 'var(--pp-primary)' : 'transparent',
                color: voiceLang === 'en-IN' ? '#ffffff' : 'var(--pp-text-secondary)',
                borderRadius: 'var(--radius-full)',
                padding: '0.2rem 0.6rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🇮🇳 English
            </button>
          </div>
        </div>
      </div>

      {/* Helpful Hint While Listening */}
      {isListening && (
        <div style={{ marginTop: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--font-size-xs)', color: 'var(--pp-danger)', fontWeight: 500 }}>
          <Volume2 size={14} className="spin-slow" />
          <span>
            {voiceLang === 'hi-IN' ? str(lang, 'voiceActiveHindi') : str(lang, 'voiceActiveEng')}
            {' — '}
            {hasSound ? str(lang, 'voiceListening') : str(lang, 'voiceSpeakingHint')}
          </span>
        </div>
      )}

      {/* Live Interim Transcription Stream */}
      {interimText && (
        <div style={{
          marginTop: '0.5rem',
          padding: '0.5rem 0.75rem',
          background: '#ffffff',
          border: '1px dashed var(--pp-primary)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--pp-primary)',
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--pp-text-muted)', textTransform: 'uppercase' }}>
            {str(lang, 'voiceInterimLabel')}
          </span>
          <span style={{ fontStyle: 'italic', fontWeight: 500 }}>
            "{interimText}"
          </span>
        </div>
      )}

      {/* Error Notices */}
      {voiceError && (
        <div className="pp-alert pp-alert-warning" style={{ marginTop: '0.625rem', padding: '0.625rem 0.875rem' }}>
          <MicOff size={16} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 'var(--font-size-sm)' }}>
            <strong>{t(lang, 'Voice Input Notice: ', 'वॉइस इनपुट सूचना: ')}</strong>
            {voiceError === 'unsupported' && str(lang, 'voiceUnsupported')}
            {voiceError === 'denied' && str(lang, 'voiceDenied')}
            {voiceError === 'network' && str(lang, 'voiceNetwork')}
            {voiceError === 'audio-capture' && str(lang, 'voiceMicMissing')}
            {voiceError === 'error' && str(lang, 'voiceError')}
          </div>
        </div>
      )}

      <style>{`
        .voice-pulse-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: #fee2e2;
          color: #dc2626;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: 700;
        }
        .voice-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #dc2626;
          animation: dot-pulse 1.2s infinite ease-in-out;
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        .audio-wave-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 3px;
          height: 22px;
          padding: 0 4px;
        }
        .wave-bar {
          width: 3.5px;
          border-radius: 2px;
          transition: height 0.1s ease, background 0.2s ease;
        }
      `}</style>
    </div>
  );
}

/* ── Step Progress Bar ─────────────────────────────────────── */
function StepBar({ step, total, lang }) {
  const stepTitles = [
    str(lang, 'step1Title'),
    str(lang, 'step2Title'),
    str(lang, 'step3Title'),
  ];
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{
            height: 6,
            flex: 1,
            borderRadius: 4,
            background: i < step ? 'var(--pp-primary)' : 'var(--pp-border-strong)',
            transition: 'background 0.3s ease'
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)' }}>
        <span>{t(lang, `Step ${step} of ${total}: ${stepTitles[step - 1]}`, `चरण ${step} / ${total}: ${stepTitles[step - 1]}`)}</span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
    </div>
  );
}

/* ── Emergency Banner ──────────────────────────────────────── */
function EmergencyBanner({ lang }) {
  return (
    <div className="pp-alert pp-alert-emergency" style={{ marginBottom: '1.25rem' }}>
      <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
      <div>
        <div style={{ fontWeight: 700, marginBottom: '0.375rem' }}>{str(lang, 'emergencyTitle')}</div>
        <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: '0.75rem' }}>{str(lang, 'emergencyMsg')}</div>
        <a
          href="tel:112"
          className="pp-btn pp-btn-danger pp-btn-sm"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700 }}
        >
          <Phone size={14} />
          {str(lang, 'emergencyCall')}
        </a>
      </div>
    </div>
  );
}

/* ── Main IntakeFlow Component ─────────────────────────────── */
export default function IntakeFlow({ lang = 'en' }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 3;

  const [form, setForm] = useState({
    chief_complaint: '',
    duration: '',
    severity: 5,
    notes: '',
    language: lang,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Keep language in form in sync
  useEffect(() => {
    setForm(f => ({ ...f, language: lang }));
  }, [lang]);

  const isEmergency = result?.destination === 'EMERGENCY' || result?.triage_result === 'EMERGENCY';

  function validate1() {
    const e = {};
    if (!form.chief_complaint || form.chief_complaint.trim().length < 10) {
      e.chief_complaint = str(lang, 'reqComplaint');
    }
    return e;
  }

  function validate2() {
    const e = {};
    if (!form.duration) e.duration = str(lang, 'reqDuration');
    return e;
  }

  function handleNext() {
    const e = step === 1 ? validate1() : step === 2 ? validate2() : {};
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep(s => s + 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const data = await submitIntake(form);
      setResult(data);
      if (data?.destination === 'EMERGENCY') {
        toast.error(str(lang, 'emergencyTitle'), { duration: 6000 });
      } else {
        toast.success(t(lang, 'Intake submitted!', 'इनपुट जमा किया गया!'));
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Submission failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  // Handle appending voice-transcribed phrase cleanly
  const handleAppendVoiceText = useCallback((newPhrase) => {
    if (!newPhrase) return;
    setForm(f => {
      const existing = (f.chief_complaint || '').trim();
      const updated = existing ? `${existing} ${newPhrase.trim()}` : newPhrase.trim();
      return { ...f, chief_complaint: updated };
    });
    // Clear any previous error once valid text is entered
    setErrors(e => ({ ...e, chief_complaint: undefined }));
  }, []);

  // Quick symptom chips handler
  function handleAddSymptomChip(chip) {
    const textToAdd = lang === 'hi' ? chip.hi : chip.en;
    setForm(f => {
      const existing = (f.chief_complaint || '').trim();
      if (existing.includes(textToAdd)) return f; // avoid immediate duplicate
      const updated = existing ? `${existing}. ${textToAdd}` : textToAdd;
      return { ...f, chief_complaint: updated };
    });
    setErrors(e => ({ ...e, chief_complaint: undefined }));
  }

  // ── Result Screen ──
  if (result) {
    const destKey = result.destination || result.triage_result || 'PHC';
    const cfg = DEST_CONFIG[destKey] || DEST_CONFIG.PHC;
    return (
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        {isEmergency && <EmergencyBanner lang={lang} />}

        <div className="pp-card pp-animate-in" style={{ borderLeft: `6px solid ${cfg.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-xl)', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={28} style={{ color: cfg.color }} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {str(lang, 'resultTitle')}
              </div>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: cfg.color }}>
                {t(lang, cfg.label, cfg.labelHi)}
              </div>
            </div>
          </div>

          {result.reason && (
            <div className="pp-alert pp-alert-info" style={{ marginBottom: '1.25rem' }}>
              <Info size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>{result.reason}</span>
            </div>
          )}

          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--pp-text-secondary)', marginBottom: '1.5rem', background: '#f8fafc', padding: '0.875rem 1rem', borderRadius: 'var(--radius-lg)' }}>
            <strong style={{ color: 'var(--pp-text-primary)' }}>{t(lang, 'Next steps: ', 'अगले चरण: ')}</strong>
            {t(lang, cfg.advice, cfg.adviceHi)}
          </div>

          {result._demo && (
            <div className="pp-alert pp-alert-warning" style={{ marginBottom: '1.25rem' }}>
              <Info size={16} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 'var(--font-size-xs)' }}>{str(lang, 'demoNotice')}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="pp-btn pp-btn-primary" onClick={() => navigate('/patient/qr-pass')} style={{ textDecoration: 'none' }}>
              <QrCode size={16} />
              {t(lang, 'Get My QR Pass', 'मेरा QR पास पाएं')}
            </button>
            <button
              className="pp-btn pp-btn-outline"
              onClick={() => {
                setResult(null);
                setStep(1);
                setForm({ chief_complaint: '', duration: '', severity: 5, notes: '', language: lang });
              }}
            >
              {t(lang, 'Start Over', 'फिर से शुरू करें')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Multi-Step Intake Screen ──
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div className="pp-card pp-animate-in">
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: '0.375rem' }}>
          {step === 1 ? str(lang, 'step1Title') : step === 2 ? str(lang, 'step2Title') : str(lang, 'step3Title')}
        </h1>
        <p style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem' }}>
          {step === 1 ? str(lang, 'step1Sub') : step === 2 ? str(lang, 'step2Sub') : t(lang, 'Review your symptoms before submitting to get routing', 'रूटिंग प्राप्त करने के लिए जमा करने से पहले अपने लक्षणों की समीक्षा करें')}
        </p>

        <StepBar step={step} total={TOTAL_STEPS} lang={lang} />

        {/* STEP 1: Chief Complaint with Bilingual Voice Input */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Audio Voice Input Box */}
            <VoiceInput
              lang={lang}
              onAppendText={handleAppendVoiceText}
              currentText={form.chief_complaint}
              onClearText={() => setForm(f => ({ ...f, chief_complaint: '' }))}
            />

            {/* Editable Chief Complaint Textarea */}
            <div className="pp-field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                <label className="pp-label" htmlFor="chief-complaint" style={{ marginBottom: 0 }}>
                  {str(lang, 'complaintLabel')} *
                </label>
                {form.chief_complaint && (
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, chief_complaint: '' }))}
                    className="pp-btn pp-btn-ghost pp-btn-sm"
                    style={{ fontSize: 'var(--font-size-xs)', padding: '0.2rem 0.5rem', color: 'var(--pp-text-muted)' }}
                  >
                    <RotateCcw size={12} /> {str(lang, 'clearText')}
                  </button>
                )}
              </div>

              <textarea
                id="chief-complaint"
                className="pp-input pp-textarea"
                placeholder={str(lang, 'complaintPh')}
                value={form.chief_complaint}
                onChange={e => {
                  const val = e.target.value;
                  setForm(f => ({ ...f, chief_complaint: val }));
                  if (val.trim().length >= 10) {
                    setErrors(prev => ({ ...prev, chief_complaint: undefined }));
                  }
                }}
                rows={5}
                maxLength={1000}
                aria-required="true"
                aria-describedby={errors.chief_complaint ? 'complaint-error' : undefined}
                style={{ fontSize: 'var(--font-size-md)', lineHeight: 1.6 }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                {errors.chief_complaint ? (
                  <span id="complaint-error" className="pp-error-text" style={{ fontSize: 'var(--font-size-xs)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <AlertCircle size={12} /> {errors.chief_complaint}
                  </span>
                ) : (
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)' }}>
                    {str(lang, 'charCountMin')}
                  </span>
                )}
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)', fontWeight: 500 }}>
                  {form.chief_complaint.length}/1000
                </span>
              </div>
            </div>

            {/* Quick Symptom Chips */}
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-secondary)', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Sparkles size={13} style={{ color: '#f59e0b' }} />
                {str(lang, 'quickSymptoms')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {COMMON_SYMPTOMS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddSymptomChip(chip)}
                    className="pp-btn pp-btn-outline pp-btn-sm"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      background: '#ffffff',
                      textAlign: 'left'
                    }}
                  >
                    + {lang === 'hi' ? chip.hi : chip.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Duration + severity + notes */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="pp-field">
              <label className="pp-label">{str(lang, 'durationLabel')} *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {DURATIONS.map(d => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => {
                      setForm(f => ({ ...f, duration: d.value }));
                      setErrors(prev => ({ ...prev, duration: undefined }));
                    }}
                    className={`pp-btn pp-btn-sm ${form.duration === d.value ? 'pp-btn-primary' : 'pp-btn-outline'}`}
                    aria-pressed={form.duration === d.value}
                    style={{ minWidth: 90 }}
                  >
                    {t(lang, d.label, d.labelHi)}
                  </button>
                ))}
              </div>
              {errors.duration && <span className="pp-error-text">{errors.duration}</span>}
            </div>

            <div className="pp-field">
              <label className="pp-label" htmlFor="severity">
                {str(lang, 'severityLabel')}: <strong style={{ color: form.severity >= 8 ? 'var(--pp-danger)' : form.severity >= 5 ? 'var(--pp-warning)' : 'var(--pp-primary)', fontSize: '1.1rem' }}>{form.severity}</strong>/10
              </label>
              <input
                id="severity"
                type="range"
                min={1} max={10} step={1}
                value={form.severity}
                onChange={e => setForm(f => ({ ...f, severity: parseInt(e.target.value, 10) }))}
                style={{ width: '100%', accentColor: 'var(--pp-primary)', height: 8, cursor: 'pointer', margin: '0.5rem 0' }}
                aria-valuemin={1} aria-valuemax={10} aria-valuenow={form.severity}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--pp-text-muted)' }}>
                <span>{t(lang, '1 - Mild', '1 - हल्का')}</span>
                <span>{t(lang, '5 - Moderate', '5 - मध्यम')}</span>
                <span style={{ color: form.severity >= 8 ? 'var(--pp-danger)' : 'inherit', fontWeight: form.severity >= 8 ? 700 : 400 }}>
                  {t(lang, '10 - Severe', '10 - अत्यधिक गंभीर')}
                </span>
              </div>
            </div>

            <div className="pp-field">
              <label className="pp-label" htmlFor="intake-notes">{str(lang, 'notesLabel')}</label>
              <textarea
                id="intake-notes"
                className="pp-input pp-textarea"
                placeholder={str(lang, 'notesPh')}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3}
                maxLength={500}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Review */}
        {step === 3 && (
          <div className="pp-alert pp-alert-info" style={{ flexDirection: 'column', gap: '0.875rem' }}>
            <div>
              <strong style={{ display: 'block', color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                {str(lang, 'complaintLabel')}:
              </strong>
              <div style={{ fontSize: 'var(--font-size-md)', marginTop: 2, fontWeight: 600 }}>{form.chief_complaint}</div>
            </div>
            <hr className="pp-divider" style={{ margin: '0.25rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <strong style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                  {str(lang, 'durationLabel')}:
                </strong>{' '}
                <span style={{ fontWeight: 600 }}>{DURATIONS.find(d => d.value === form.duration)?.label || form.duration}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                  {t(lang, 'Severity', 'गंभीरता')}:
                </strong>{' '}
                <span style={{ fontWeight: 700, color: form.severity >= 8 ? 'var(--pp-danger)' : 'var(--pp-primary)' }}>
                  {form.severity}/10
                </span>
              </div>
            </div>
            {form.notes && (
              <div>
                <strong style={{ display: 'block', color: 'var(--pp-text-secondary)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>
                  {str(lang, 'notesLabel')}:
                </strong>
                <div style={{ marginTop: 2 }}>{form.notes}</div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          {step > 1 ? (
            <button className="pp-btn pp-btn-ghost" onClick={() => setStep(s => s - 1)}>
              <ChevronLeft size={16} /> {str(lang, 'btnBack')}
            </button>
          ) : <span />}

          {step < TOTAL_STEPS ? (
            <button className="pp-btn pp-btn-primary" onClick={handleNext}>
              {str(lang, 'btnContinue')} <ChevronRight size={16} />
            </button>
          ) : (
            <button
              className="pp-btn pp-btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? <><Loader2 size={16} className="spin-anim" /> {t(lang, 'Submitting…', 'जमा हो रहा है…')}</>
                : <><CheckCircle2 size={16} /> {str(lang, 'btnSubmit')}</>
              }
            </button>
          )}
        </div>
      </div>
      <style>{`
        .spin-anim { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
