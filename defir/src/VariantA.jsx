// VARIANT A · корневой компонент: собирает секции + tweaks-панель
const D = window.DEFIR;
const { useState, useEffect } = React;
const { useATokens } = window.A_aux;
const { ATopBar, AHero, ATriggers, ARules, ADossier } = window.A_sec1;
const { AFactions, AMap, AExcerpt, ADevlog, ACta } = window.A_sec2;
const { AFilter, ACrystals, ASignature, AParts } = window.A_sec3;

function ATweaksPanel({ values, setTweak }) {
  if (!window.TweaksPanel) return null;
  const { TweaksPanel, TweakSection, TweakRadio, TweakSlider, TweakSelect } = window;
  return (
    <TweaksPanel title="ДЭФИР · tweaks">
      <TweakSection label="цвет">
        <TweakRadio
          label="схема"
          value={values.scheme}
          options={[
            { value: 'lime',   label: 'лайм' },
            { value: 'orange', label: 'оранж' },
            { value: 'rose',   label: 'роза' },
          ]}
          onChange={(v) => setTweak('scheme', v)}
        />
      </TweakSection>
      <TweakSection label="форма">
        <TweakSlider label="наклон карточек" value={values.tilt} min={0} max={3} step={0.1} unit="°" onChange={(v) => setTweak('tilt', v)} />
        <TweakSlider label="размер тени"     value={values.shadow} min={0} max={14} step={1} unit="px" onChange={(v) => setTweak('shadow', v)} />
      </TweakSection>
      <TweakSection label="тон">
        <TweakRadio
          label="настроение"
          value={values.tone}
          options={[
            { value: 'soft',     label: 'мягко' },
            { value: 'balanced', label: 'окей' },
            { value: 'harsh',    label: 'жёстко' },
          ]}
          onChange={(v) => setTweak('tone', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

function VariantA() {
  const { values, setTweak, t } = useATokens();
  return (
    <div style={{
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      background: t.paper, color: t.ink, minHeight: '100%',
      position: 'relative',
    }}>
      <ATopBar t={t} />
      <AHero t={t} />
      <ATriggers t={t} />
      <ARules t={t} />
      <ADossier t={t} />
      <AFactions t={t} />
      <AMap t={t} />
      <AFilter t={t} />
      <ACrystals t={t} />
      <ASignature t={t} />
      <AExcerpt t={t} />
      <AParts t={t} />
      <ADevlog t={t} />
      <ACta t={t} />
      <ATweaksPanel values={values} setTweak={setTweak} />
    </div>
  );
}

window.VariantA = VariantA;
